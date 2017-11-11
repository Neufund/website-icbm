import config from "../config";
import { TransactionFailedError } from "../errors";
import { Web3Service } from "./web3Service";

const timeout = 3000;

export const transactionConfirmation = async (
  transactionHash: string,
  transactionMinedCallback: (blockNo: number) => void,
  newBlockCallback: (blockNo: number) => void
) => {
  // console.log("waiting for transaction: " + transactionHash);
  return new Promise((resolve, reject) => {
    let prevBlockNo = -1;
    let startingBlock = -1;
    const requiredConfirmations = config.contractsDeployed.numberOfConfirmations;
    const poll = async () => {
      let currentBlockNo;
      try {
        currentBlockNo = await Web3Service.instance.getBlockNumber();
      } catch (e) {
        // console.log("error in web3.eth.getBlockNumber");
        // console.log(e);
        return reject(e);
      }

      if (startingBlock === -1) {
        startingBlock = currentBlockNo;
      }

      // console.log(`got block number ${currentBlockNo} prev block number ${prevBlockNo}`);
      if (currentBlockNo !== prevBlockNo) {
        newBlockCallback(currentBlockNo);
        prevBlockNo = currentBlockNo;
        try {
          const tx = await Web3Service.instance.getTransaction(transactionHash);
          if (tx && tx.blockNumber != null) {
            const txReceipt = await Web3Service.instance.getTransactionReceipt(transactionHash);
            if (txReceipt.status !== null) {
              const txStatus = parseInt(txReceipt.status, 16);
              if (txStatus === 0) {
                return reject(new TransactionFailedError(tx.hash));
              }
            }
            transactionMinedCallback(tx.blockNumber);
            if (currentBlockNo - tx.blockNumber >= requiredConfirmations - 1) {
              // console.log("we have enough confirmations we can move on");
              return resolve();
            }
          }
        } catch (e) {
          // console.log("error in web3.eth.getTransaction");
          // console.log(e);
          return reject(e);
        }
      }
      window.setTimeout(poll, timeout);
    };
    window.setTimeout(poll, timeout);
  });
};
