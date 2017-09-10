import * as React from "react";
import * as style from "./CommitFundsDescription.scss";
import { TextCopyable } from "./TextCopyable";

export const CommitFundsDescription: React.SFC = () => (
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
      <TextCopyable
        className={style.textCopyable}
        text="0x6895304785c271b827f1990860d5093e30d2a121"
      />
      <br />
      <a href="">Verify source code on Etherscan</a>
    </p>
    <p>
      Include following descriptionin your transaction:
      <br />
      <TextCopyable className={style.textCopyable} text="0x3c7a3aff" />
    </p>
  </div>
);
