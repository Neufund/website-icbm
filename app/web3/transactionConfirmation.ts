import { promisify } from "bluebird";
import config from "../config";
import web3Provider from "./web3Provider";

const getBlockNumber = promisify<number>(web3Provider.eth.getBlockNumber);
const getTransaction = promisify<any, string>(web3Provider.eth.getTransaction);

const timeout = 3000;

export const transactionConfirmation = async (
  transactionHash: string,
  transactionMinedCallback: any,
  newBlockCallback: any
) => {
  // console.log("waiting for transaction: " + transactionHash);
  return new Promise((resolve, reject) => {
    let prevBlockNo = -1;
    let startingBlock = -1;
    const requiredConfirmations = config.transactionSigning.numberOfConfirmations;
    const maxNumberOfBlocksToWait = config.transactionSigning.maxNumberBlocksToWait;
    const poll = async () => {
      let currentBlockNo;
      try {
        currentBlockNo = await getBlockNumber();
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
        newBlockCallback(currentBlockNo);

        try {
          const transaction = await getTransaction(transactionHash);
          // console.log(`got transaction with block number: ${transaction.blockNumber}`);
          if (transaction.blockNumber != null) {
            transactionMinedCallback(transaction.blockNumber);
            if (currentBlockNo - transaction.blockNumber >= requiredConfirmations) {
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
