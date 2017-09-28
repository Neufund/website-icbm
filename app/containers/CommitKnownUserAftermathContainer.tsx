import { BigNumber } from "bignumber.js";
import { Moment } from "moment";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { loadAftermathDetails } from "../actions/aftermathActions";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { UnderlinedLink } from "../components/UnderlinedLink";
import {
  selectLoading,
  selectLockedAmount,
  selectNeumarkBalance,
  selectUnlockDate,
} from "../reducers/aftermathState";
import { IAppState } from "../reducers/index";
import * as styles from "./Aftermath.scss";

interface IAftermathOwnProps {
  userAddress: string;
}

interface IAftermathProps {
  isLoading: boolean;
  loadAftermathDetails: () => {};
  lockedAmount: BigNumber;
  neumarkBalance: BigNumber;
  unlockDate: Moment;
}

export class CommitKnownUserAftermath extends React.Component<
  IAftermathProps & IAftermathOwnProps
> {
  public componentDidMount() {
    this.props.loadAftermathDetails();
  }

  public render() {
    const { isLoading, userAddress, lockedAmount, unlockDate, neumarkBalance } = this.props;

    if (isLoading) {
      return (
        <div className={styles.aftermath}>
          <LoadingIndicator />
        </div>
      );
    }
    return (
      <div className={styles.aftermath}>
        <div>
          <div className={styles.header}>Sneak peak to your committed funds</div>
          <UnderlinedLink href="#">
            If you want to see your transactions, go to etherscan.io
          </UnderlinedLink>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.caption}>For address</div>
          <div className={styles.value}>
            {userAddress}
          </div>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.caption}>Locked amount</div>
          <div className={styles.value}>
            {lockedAmount.toFixed(2)} ETH
          </div>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.caption}>Unlock date</div>
          <div className={styles.value}>
            {unlockDate.format("YYYY-MM-DD")}
          </div>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.caption}>Neumark balance</div>
          <div className={styles.value}>
            {neumarkBalance.toFixed(2)} NEU
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IAppState) {
  return {
    isLoading: selectLoading(state.aftermathState),
    lockedAmount: selectLockedAmount(state.aftermathState),
    neumarkBalance: selectNeumarkBalance(state.aftermathState),
    unlockDate: selectUnlockDate(state.aftermathState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: IAftermathOwnProps) {
  return {
    loadAftermathDetails: () => dispatch(loadAftermathDetails(ownProps.userAddress)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitKnownUserAftermath);
