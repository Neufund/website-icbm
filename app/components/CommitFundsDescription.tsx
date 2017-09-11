import * as React from "react";
import * as style from "./CommitFundsDescription.scss";
import { TextCopyable } from "./TextCopyable";

interface ICommitFundsDescription {
  contractAddress: string;
  transactionPayload: string;
}

export const CommitFundsDescription: React.SFC<ICommitFundsDescription> = ({
  contractAddress,
  transactionPayload,
}) =>
  <div className={style.container}>
    <h3>Other options</h3>
    <p>
      <a href="">You can also use MyEtherWallet</a>
      <br />
      <a href="">
        See the instruction if you want to commit funds from a wallet outside of web 3.0
      </a>
    </p>
    <p>
      Validate ethereum smart contract address:
      <br />
      <TextCopyable className={style.textCopyable} text={contractAddress} />
      <br />
      <a href="">Verify source code on Etherscan</a>
    </p>
    <p>
      Include following description your transaction:
      <br />
      <TextCopyable className={style.textCopyable} text={transactionPayload} />
    </p>
  </div>;
