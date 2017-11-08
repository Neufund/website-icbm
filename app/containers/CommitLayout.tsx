import * as jQuery from "jquery";
import * as React from "react";
import { Grid } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { initCommit } from "../actions/commitActions";
import { Web3Type } from "../actions/constants";
import { CommitHeaderComponent } from "../components/commitfunds/CommitHeaderComponent";
import { FatalErrorComponent } from "../components/FatalErrorComponent";
import { LegalModal } from "../components/LegalModal";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { WalletSelectorComponent } from "../components/walletSelector/WalletSelector";
import { WhitelistedCommitmentNote } from "../components/WhitelistedCommitmentNote";
import { IAppState } from "../reducers/index";
import { selectIsKnownUser } from "../reducers/userState";
import { selectWeb3Type } from "../reducers/web3State";

interface ICommitComponent {
  fatalError: string;
  isKnownUser: boolean;
  isLoading: boolean;
  initCommit: () => {};
  web3Type: Web3Type;
}

class CommitLayoutComponent extends React.Component<ICommitComponent> {
  constructor(props: ICommitComponent) {
    super(props);
    this.state = {
      timerID: null,
      showChooseAddressDialog: false,
    };
  }

  public async componentDidMount() {
    await this.props.initCommit();
    jQuery(".footer").removeClass("hidden"); // this has to be done this ugly way as footer is created outside of react app
  }

  public render() {
    const { fatalError, isLoading } = this.props;

    if (fatalError) {
      return <FatalErrorComponent fatalError={fatalError} />;
    }

    if (isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <div>
        <Grid className="full-height-container">
          <LegalModal />
          <WhitelistedCommitmentNote />
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    fatalError: state.fatalErrorState.fatalError,
    isKnownUser: selectIsKnownUser(state.userState, state.web3State),
    isLoading: state.commitmentState.loading,
    web3Type: selectWeb3Type(state.web3State),
  };
};

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    initCommit: () => dispatch(initCommit),
  };
}

export const CommitLayout = connect(mapStateToProps, mapDispatchToProps)(CommitLayoutComponent);
