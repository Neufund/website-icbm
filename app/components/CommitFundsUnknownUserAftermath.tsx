import { BigNumber } from "bignumber.js";
import { TextField } from "redux-form-material-ui";

import { Moment } from "moment";
import * as React from "react";

import { compose } from "redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { ethereumAddressValidator } from "../validators/ethereumAddressValidator";
import * as styles from "./Aftermath.scss";
import { UnderlinedLink } from "./UnderlinedLink";

interface ICommitFundsUnknownUserAftermathProps {
  lockedAmount?: BigNumber;
  unlockDate?: Moment;
  neumarkBalance?: BigNumber;
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

export const CommitFundsUnknownUserAftermath: React.SFC<
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
        {lockedAmount.toString()} ETH {/* todo: probably we will get it in wei */}
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
        {neumarkBalance.toString()} NEU
      </div>
    </div>
  </div>;

export default compose(
  reduxForm<ICommitFundsUnknownUserAftermathForm, ICommitFundsUnknownUserAftermathProps>({
    form: "commitFundsUnknownUserAftermathForm",
    onSubmit: values => {
      // tslint:disable-next-line:no-console
      console.log("submitting form. values: ", values);
    },
  })
)(CommitFundsUnknownUserAftermath);
