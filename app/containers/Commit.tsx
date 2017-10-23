import * as jQuery from "jquery";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Web3Type } from "../actions/constants";
import { loadIcoParams } from "../actions/loadIcoParams";
import {
  loadUserAccount,
  setLoadingAction,
  setUserAccountAction,
} from "../actions/loadUserAccount";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { LedgerLoginProvider } from "../ledgerLoginProvider";
import { IAppState } from "../reducers/index";
import { selectIsKnownUser, selectLoading } from "../reducers/userState";
import { selectWeb3Type } from "../reducers/web3State";
import CommitKnownUserContainer from "./CommitKnownUserContainer";
import CommitUnknownUserContainer from "./CommitUnknownUserContainer";

const SECOND = 1000;

interface ICommitComponent {
  isKnownUser: boolean;
  isLoading: boolean;
  setLoadingFalse: () => {};
  loadUserAccount: () => {};
  loadIcoParams: () => {};
  setUserAddress: (address: string) => {};
  web3Type: Web3Type;
}

interface ICommitState {
  timerID: number;
  showChooseAddressDialog: boolean;
}

class Commit extends React.Component<ICommitComponent, ICommitState> {
  constructor(props: ICommitComponent) {
    super(props);
    this.state = {
      timerID: null,
      showChooseAddressDialog: false,
    };
  }

  public componentDidMount() {
    this.props.loadIcoParams();
    if (this.props.web3Type === Web3Type.INJECTED) {
      const timerID = window.setInterval(() => {
        this.props.loadUserAccount();
      }, SECOND);

      this.setState({
        ...this.state,
        timerID,
      });
    } else {
      this.props.setLoadingFalse();
      const ledgerLoginProvider = new LedgerLoginProvider();
      ledgerLoginProvider.onConnect(() => {
        this.setState({
          ...this.state,
          showChooseAddressDialog: true,
        });
        ledgerLoginProvider.stop();
      });
      ledgerLoginProvider.start();
    }
  }

  public componentWillUnmount() {
    clearInterval(this.state.timerID);
  }

  public render() {
    const { isKnownUser, isLoading } = this.props;

    if (isLoading) {
      return <LoadingIndicator />;
    }
    return isKnownUser
      ? <CommitKnownUserContainer />
      : <CommitUnknownUserContainer
          showChooseAddressDialog={this.state.showChooseAddressDialog}
          handleAddressChosen={this.handleAddressChosen}
        />;
  }

  private handleAddressChosen = (_derivationPath: string, address: string): void => {
    this.props.setUserAddress(address);
    this.setState({
      ...this.state,
      showChooseAddressDialog: false,
    });
  };
}

const mapStateToProps = (state: IAppState) => {
  return {
    isKnownUser: selectIsKnownUser(state.userState),
    isLoading: selectLoading(state.userState),
    web3Type: selectWeb3Type(state.web3State),
  };
};

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    setLoadingFalse: () => {
      dispatch(setLoadingAction(false));
      jQuery(".footer").removeClass("hidden"); // this has to be done this ugly way as footer is created outside of react app
    },
    loadUserAccount: () => dispatch(loadUserAccount),
    loadIcoParams: () => dispatch(loadIcoParams),
    setUserAddress: (address: string) => {
      dispatch(setUserAccountAction(address));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Commit);
