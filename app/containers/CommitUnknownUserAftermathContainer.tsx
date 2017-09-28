import { BigNumber } from "bignumber.js";
import { TextField } from "redux-form-material-ui";

import { Moment } from "moment";
import * as React from "react";

import { connect, Dispatch } from "react-redux";
import { compose } from "redux";
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from "redux-form";
import { loadAftermathDetails } from "../actions/aftermathActions";
import { UnderlinedLink } from "../components/UnderlinedLink";
import {
  selectLoading,
  selectLockedAmount,
  selectNeumarkBalance,
  selectUnlockDate,
} from "../reducers/aftermathState";
import { IAppState } from "../reducers/index";
import { ethereumAddressValidator } from "../validators/ethereumAddressValidator";
import * as styles from "./Aftermath.scss";

interface ICommitFundsUnknownUserAftermathProps {
  lockedAmount?: BigNumber;
  unlockDate?: Moment;
  neumarkBalance?: BigNumber;
  loadAftermathDetails: (address: string) => {};
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
> = ({ lockedAmount, unlockDate, neumarkBalance, handleSubmit }) =>
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
  </div>;

function mapStateToProps(state: IAppState) {
  return {
    lockedAmount: selectLockedAmount(state.aftermathState),
    neumarkBalance: selectNeumarkBalance(state.aftermathState),
    unlockDate: selectUnlockDate(state.aftermathState),
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    loadAftermathDetails: (address: string) => dispatch(loadAftermathDetails(address)),
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
