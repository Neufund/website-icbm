import * as React from "react";
import { AddressCopyable } from "./AddressCopyable";

export const CommitFundsDescription: React.SFC = () =>
  <div>
    <h3>Other options</h3>
    <p>
      <a href="">You can also use MyEtherWallet</a>
    </p>
    <p>
      <a href="">
        See the instruction if you want to commit funds from a wallet outside of web 3.0
      </a>
    </p>
    <p>Validate ethereum smart contract address:</p>
    <AddressCopyable address="0x6895304785c271b827f1990860d5093e30d2a121" />
    <p>
      <a href="">Verify source code on Etherscan</a>
    </p>
    <p>Include following descriptionin your transaction: </p>
    <AddressCopyable address="0x3c7a3aff" />
  </div>;
