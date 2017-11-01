import config from "../config";
import { Web3Service } from "./web3Service";

const timeout = 3000;

export const transactionConfirmation = async (
  transactionHash: string,
  transactionMinedCallback: (blockNo: number) => void,
  newBlockCallback: (blockNo: number, confirmedTx: boolean) => void
) => {
  // console.log("waiting for transaction: " + transactionHash);
  return new Promise((resolve, reject) => {
    let prevBlockNo = -1;
    let startingBlock = -1;
    const requiredConfirmations = config.contractsDeployed.numberOfConfirmations;
    const maxNumberOfBlocksToWait = config.contractsDeployed.maxNumberBlocksToWait;
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

      if (currentBlockNo - startingBlock >= maxNumberOfBlocksToWait) {
        return reject(
          `Your transaction has not been mined in last ${maxNumberOfBlocksToWait} blocks`
        );
      }

      // console.log(`got block number ${currentBlockNo} prev block number ${prevBlockNo}`);
      if (currentBlockNo !== prevBlockNo) {
        prevBlockNo = currentBlockNo;
        try {
          const transaction = await Web3Service.instance.getTransaction(transactionHash);
          let isTxConfirmed = false;
          // console.log(`got transaction with block number: ${transaction.blockNumber}`);
          if (transaction.blockNumber != null) {
            transactionMinedCallback(transaction.blockNumber);
            isTxConfirmed = true;
            if (currentBlockNo - transaction.blockNumber >= requiredConfirmations - 1) {
              // console.log("we have enough confirmations we can move on");
              return resolve();
            }
          }
          newBlockCallback(currentBlockNo, isTxConfirmed);
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
