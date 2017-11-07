import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Web3Type } from "../../actions/constants";
import { transactionResetAction } from "../../actions/submitFunds";
import { IAppState } from "../../reducers/index";
import { selectWeb3Type } from "../../reducers/web3State";
import { SignInstructionGeneric } from "./SignInstructionGeneric";

interface ISignInstructionComponent {
  web3Type: Web3Type;
  handleBackClick: () => void;
}

export const SignInstructionComponent: React.SFC<ISignInstructionComponent> = ({
  web3Type,
  handleBackClick,
}) => {
  switch (web3Type) {
    default:
      return <SignInstructionGeneric handleBackClick={handleBackClick} />;
  }
};

function mapStateToProps(state: IAppState) {
  return {
    web3Type: selectWeb3Type(state.web3State),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    handleBackClick: (e: any) => {
      e.preventDefault();
      dispatch(transactionResetAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInstructionComponent);
