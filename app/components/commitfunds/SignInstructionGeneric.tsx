import * as React from "react";

interface ISignInstructionGeneric {
  handleBackClick: (e: any) => void;
}

export const SignInstructionGeneric: React.SFC<ISignInstructionGeneric> = ({ handleBackClick }) =>
  <div>
    Please confirm transaction using signer and wait for it to be send to Ethereum node or{" "}
    <a href="#" onClick={handleBackClick}>
      back to change your commit
    </a>.
  </div>;
