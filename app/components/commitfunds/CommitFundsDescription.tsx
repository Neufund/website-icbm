import * as React from "react";
import { TextCopyable } from "../TextCopyable";
import { UnderlinedLink } from "../UnderlinedLink";
import * as style from "./CommitFundsDescription.scss";

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
      <UnderlinedLink href="#">You can also use MyEtherWallet</UnderlinedLink>
      <br />
      <UnderlinedLink href="#">
        See the instruction if you want to commit funds from a wallet outside of web 3.0
      </UnderlinedLink>
    </p>
    <p>
      Validate ethereum smart contract address:
      <br />
      <TextCopyable className={style.textCopyable} text={contractAddress} />
      <br />
      <UnderlinedLink href="#">Verify source code on Etherscan</UnderlinedLink>
    </p>
    <p>
      Include following description your transaction:
      <br />
      <TextCopyable className={style.textCopyable} text={transactionPayload} />
    </p>
  </div>;
