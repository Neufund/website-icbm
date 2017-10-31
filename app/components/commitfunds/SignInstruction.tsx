import * as React from "react";
import { connect } from "react-redux";

import { Web3Type } from "../../actions/constants";
import { IAppState } from "../../reducers/index";
import { selectWeb3Type } from "../../reducers/web3State";
import SignInstructionGeneric from "./SignInstructionGeneric";
import SignInstructionParity from "./SignInstructionParity";

interface ISignInstruction {
  web3Type: Web3Type;
}

export const SignInstructionComponent: React.SFC<ISignInstruction> = ({ web3Type }) => {
  switch (web3Type) {
    case Web3Type.GENERIC:
      return <SignInstructionGeneric />;
    case Web3Type.PARITY:
      return <SignInstructionParity />;
    default:
      throw new Error("Not supported");
  }
};

function mapStateToProps(state: IAppState) {
  return {
    web3Type: selectWeb3Type(state.web3State),
  };
}

export default connect(mapStateToProps)(SignInstructionComponent);
