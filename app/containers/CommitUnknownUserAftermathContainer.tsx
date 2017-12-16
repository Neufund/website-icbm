import { Moment } from "moment";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";

import { loadAftermathDetails } from "../actions/aftermathActions";
import { EtherScanLinkType, TokenType } from "../actions/constants";
import { getReservationAgreementTags, getTokenHolderAgreementTags } from "../actions/getTags";
import { DownloadDocumentLink } from "../components/DownloadDocumentLink";
import EtherScanLink from "../components/EtherScanLink";
import MoneyComponent from "../components/MoneyComponent";
import { isAddressSet, selectUnlockDateEth, selectUnlockDateEur } from "../reducers/aftermathState";
import { IAppState } from "../reducers/index";
import {
  selectReservationAgreementHash,
  selectTokenHolderAgreementHash,
} from "../reducers/legalAgreementState";
import { IDictionary } from "../types";
import { ethereumAddressValidator } from "../validators/ethereumAddressValidator";
import * as styles from "./Aftermath.scss";
import { CommitmentInfo } from "./CommitKnownUserAftermathContainer";

interface ICommitFundsUnknownUserAftermathProps {
  loadAftermathDetails: (address: string) => {};
  getTokenHolderAgreementTags: () => Promise<IDictionary>;
  getReservationAgreementTags: (tokenType: TokenType) => Promise<IDictionary>;
  isAddressSet: boolean;
  lockedAmountEth: string;
  neumarkBalanceEth: string;
  unlockDateEth: Moment;
  lockedAmountEur: string;
  neumarkBalanceEur: string;
  unlockDateEur: Moment;
  reservationAgreementHash: string;
  tokenHolderAgreementHash: string;
  neumarkBalance: string;
  router: any;
  address: string;
}

interface ICommitFundsUnknownUserAftermathForm {
  address: string;
}

const estTextFieldStyles = {
  inputStyle: {
    color: "#BBC2C7",
    fontWeight: 500 as 500,
  },
  style: {
    width: "370px",
  },
};

export class CommitUnknownUserAftermath extends React.Component<
  InjectedFormProps<ICommitFundsUnknownUserAftermathForm> & ICommitFundsUnknownUserAftermathProps
> {
  public componentDidMount() {
    if (this.props.initialValues && this.props.initialValues.address) {
      (this.props.handleSubmit as any)();
    }
  }

  public render() {
    const {
      lockedAmountEth,
      unlockDateEth,
      neumarkBalanceEth,
      lockedAmountEur,
      unlockDateEur,
      neumarkBalanceEur,
      handleSubmit,
      getTokenHolderAgreementTags,
      getReservationAgreementTags,
      reservationAgreementHash,
      tokenHolderAgreementHash,
      neumarkBalance,
      isAddressSet,
      address,
    } = this.props;

    const showEther = parseFloat(lockedAmountEth) > 0;
    const showEuro = parseFloat(lockedAmountEur) > 0;

    return (
      <div className={styles.aftermath}>
        <div>
          <div className={styles.header}>
            This is a sneak peak of your committed funds in the Neufund ICBM.
          </div>
        </div>

        <div className={styles.infoBox}>
          <h4>Your wallet address:</h4>
          <div className={styles.value}>
            <form
              onSubmit={e => e.preventDefault()}
              onChange={() => {
                // say thank you to redux-form. Is there a better way to achieve auto submitting? what if async validation is required?
                // using global onChange didnt work (and still there is no way to check validation status)
                setTimeout(handleSubmit);
              }}
            >
              <Field
                name="address"
                component={TextField}
                validate={ethereumAddressValidator}
                props={
                  {
                    hintText: "Enter the address",
                    inputStyle: estTextFieldStyles.inputStyle,
                    style: estTextFieldStyles.style,
                  } as any
                }
              />
            </form>
          </div>
        </div>

        {isAddressSet &&
          <div>
            <div className={styles.infoBox}>
              <h4>Your NEU balance: </h4>
              <div className={styles.value}>
                <MoneyComponent value={neumarkBalance} tokenType={TokenType.NEU} />
              </div>
            </div>

            {neumarkBalance !== "0" &&
              <div className={styles.infoBox}>
                <div className={styles.value}>
                  <DownloadDocumentLink
                    key="neumark_token_holder_agreement"
                    documentHash={tokenHolderAgreementHash}
                    getTags={getTokenHolderAgreementTags}
                    outputFilename="neumark_token_holder_agreement"
                  >
                    Token Holder Agreement
                  </DownloadDocumentLink>
                </div>
              </div>}

            {showEther &&
              <CommitmentInfo
                tokenType={TokenType.ETHER}
                lockedAmount={lockedAmountEth}
                neumarkLockedBalance={neumarkBalanceEth}
                unlockDate={unlockDateEth}
                reservationAgreementHash={reservationAgreementHash}
                getReservationAgreementTags={getReservationAgreementTags}
                neumarkBalance={neumarkBalance}
                address={address}
              />}

            {showEuro &&
              <CommitmentInfo
                tokenType={TokenType.EURO}
                lockedAmount={lockedAmountEur}
                neumarkLockedBalance={neumarkBalanceEur}
                unlockDate={unlockDateEur}
                reservationAgreementHash={reservationAgreementHash}
                getReservationAgreementTags={getReservationAgreementTags}
                neumarkBalance={neumarkBalance}
                address={address}
              />}

            <div className={styles.section}>
              <div className={styles.infoBox}>
                <h4>Your transaction history:</h4>
                <div className={styles.value}>
                  <EtherScanLink linkType={EtherScanLinkType.ADDRESS} resourceId={address}>
                    Go to etherscan to see all transactions with <i>Neufund Crowdsale</i> contract.
                  </EtherScanLink>
                </div>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

function mapStateToProps(state: IAppState) {
  return {
    lockedAmountEth: state.aftermathState.lockedAmountEth,
    lockedAmountEur: state.aftermathState.lockedAmountEur,
    neumarkBalanceEth: state.aftermathState.neumarkBalanceEth,
    neumarkBalanceEur: state.aftermathState.neumarkBalanceEur,
    unlockDateEth: selectUnlockDateEth(state.aftermathState),
    unlockDateEur: selectUnlockDateEur(state.aftermathState),
    neumarkBalance: state.aftermathState.neumarkBalance,
    isAddressSet: isAddressSet(state.aftermathState),
    reservationAgreementHash: selectReservationAgreementHash(state.legalAgreementState),
    tokenHolderAgreementHash: selectTokenHolderAgreementHash(state.legalAgreementState),
    address: state.aftermathState.address,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadAftermathDetails: (address: string) => dispatch(loadAftermathDetails(address)),
    getTokenHolderAgreementTags: () => dispatch(getTokenHolderAgreementTags),
    getReservationAgreementTags: (tokenType: TokenType) =>
      dispatch(getReservationAgreementTags(tokenType)),
  };
}

const onSubmit: FormSubmitHandler<
  ICommitFundsUnknownUserAftermathForm,
  ICommitFundsUnknownUserAftermathProps
> = (values, _dispatcher, props) => {
  const address = values.address;
  props.router.push({
    pathname: "/commit/status",
    query: { address },
  });
  props.loadAftermathDetails(address);
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm<ICommitFundsUnknownUserAftermathForm, ICommitFundsUnknownUserAftermathProps>({
    onSubmit,
    form: "commitFundsUnknownUserAftermathForm",
  })
)(CommitUnknownUserAftermath);
