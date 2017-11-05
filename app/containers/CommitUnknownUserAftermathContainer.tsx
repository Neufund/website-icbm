import { BigNumber } from "bignumber.js";
import { Moment } from "moment";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { compose } from "redux";
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";

import { loadAftermathDetails } from "../actions/aftermathActions";
import { getReservationAgreementTags, getTokenHolderAgreementTags } from "../actions/getTags";
import { DownloadDocumentLink } from "../components/DownloadDocumentLink";
import { UnderlinedLink } from "../components/UnderlinedLink";
import {
  isAddressSet,
  selectLockedAmount,
  selectNeumarkBalance,
  selectShowDocuments,
  selectUnlockDate,
} from "../reducers/aftermathState";
import { IAppState } from "../reducers/index";
import {
  selectReservationAgreementHash,
  selectTokenHolderAgreementHash,
} from "../reducers/legalAgreementState";
import { IDictionary } from "../types";
import { ethereumAddressValidator } from "../validators/ethereumAddressValidator";
import * as styles from "./Aftermath.scss";

interface ICommitFundsUnknownUserAftermathProps {
  lockedAmount?: BigNumber;
  unlockDate?: Moment;
  neumarkBalance?: BigNumber;
  isAddressSet: boolean;
  loadAftermathDetails: (address: string) => {};
  getTokenHolderAgreementTags: () => Promise<IDictionary>;
  getReservationAgreementTags: () => Promise<IDictionary>;
  reservationAgreementHash: string;
  tokenHolderAgreementHash: string;
  showDocuments: boolean;
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

export const CommitUnknownUserAftermath: React.SFC<
  InjectedFormProps & ICommitFundsUnknownUserAftermathProps
> = ({
  lockedAmount,
  unlockDate,
  neumarkBalance,
  handleSubmit,
  getTokenHolderAgreementTags,
  getReservationAgreementTags,
  reservationAgreementHash,
  tokenHolderAgreementHash,
  isAddressSet,
  showDocuments,
}) =>
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
        <form
          // tslint:disable-next-line:jsx-no-lambda
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
              { inputStyle: estTextFieldStyles.inputStyle, style: estTextFieldStyles.style } as any
            }
          />
        </form>
      </div>
    </div>

    <div className={styles.infoBox}>
      <div className={styles.caption}>Locked amount</div>
      <div className={styles.value}>
        {lockedAmount ? lockedAmount.toFixed(2) : "-"} ETH
      </div>
    </div>

    <div className={styles.infoBox}>
      <div className={styles.caption}>Unlock date</div>
      <div className={styles.value}>
        {unlockDate ? unlockDate.format("YYYY-MM-DD") : "-"}
      </div>
    </div>

    <div className={styles.infoBox}>
      <div className={styles.caption}>Neumark balance</div>
      <div className={styles.value}>
        {neumarkBalance ? neumarkBalance.toFixed(2) : "-"} NEU
      </div>
    </div>
    {isAddressSet &&
      showDocuments &&
      <div className={styles.infoBox}>
        <div className={styles.caption}>Your documents</div>
        <div className={styles.value}>
          <DownloadDocumentLink
            key="neumark_token_holder_agreement"
            documentHash={tokenHolderAgreementHash}
            getTags={getTokenHolderAgreementTags}
            outputFilename="neumark_token_holder_agreement"
          >
            Token Holder Agreement
          </DownloadDocumentLink>,
          <DownloadDocumentLink
            key="reservation_agreement"
            documentHash={reservationAgreementHash}
            getTags={getReservationAgreementTags}
            outputFilename="reservation_agreement"
          >
            Reservation Agreement
          </DownloadDocumentLink>,
        </div>
      </div>}
  </div>;

function mapStateToProps(state: IAppState) {
  return {
    lockedAmount: selectLockedAmount(state.aftermathState),
    neumarkBalance: selectNeumarkBalance(state.aftermathState),
    unlockDate: selectUnlockDate(state.aftermathState),
    isAddressSet: isAddressSet(state.aftermathState),
    reservationAgreementHash: selectReservationAgreementHash(state.legalAgreementState),
    tokenHolderAgreementHash: selectTokenHolderAgreementHash(state.legalAgreementState),
    showDocuments: selectShowDocuments(state.aftermathState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadAftermathDetails: (address: string) => dispatch(loadAftermathDetails(address)),
    getTokenHolderAgreementTags: () => dispatch(getTokenHolderAgreementTags),
    getReservationAgreementTags: () => dispatch(getReservationAgreementTags),
  };
}

const onSubmit: FormSubmitHandler<
  ICommitFundsUnknownUserAftermathForm,
  ICommitFundsUnknownUserAftermathProps
> = (values, _dispatcher, props) => {
  props.loadAftermathDetails(values.address);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm<ICommitFundsUnknownUserAftermathForm, ICommitFundsUnknownUserAftermathProps>({
    onSubmit,
    form: "commitFundsUnknownUserAftermathForm",
  })
)(CommitUnknownUserAftermath);
