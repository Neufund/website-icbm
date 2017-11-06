import { BigNumber } from "bignumber.js";
import TextField from "material-ui/TextField";
import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { TokenType } from "../../actions/constants";
import { commitmentValueValidator } from "../../validators/commitmentValueValidator";
import { IconLink } from "../IconLink";
import { LoadingIndicator } from "../LoadingIndicator";
import MoneyComponent from "../MoneyComponent";
import * as style from "./CommitUnknownUserEstimation.scss";

const estTextFieldStyles = {
  inputStyle: {
    color: "#BBC2C7",
    fontWeight: 500 as 500,
    fontSize: "22px",
  },
  hintStyle: {
    color: "#BBC2C7",
    fontWeight: 500 as 500,
    fontSize: "22px",
  },
  style: {
    width: "120px",
    marginLeft: "5px",
    marginRight: "5px",
  },
};

const styledField = (props: any) => {
  const computedProps = {
    name: "ether",
    inputStyle: estTextFieldStyles.inputStyle,
    style: estTextFieldStyles.style,
    hintStyle: estTextFieldStyles.hintStyle,
    hintText: "0",
    autoComplete: "off",
    ...props.input,
  };

  if (!props.meta.pristine && props.meta.error) {
    computedProps.errorText = props.meta.error;
  }

  return <TextField {...computedProps} />;
};

interface ICommitFundsEstimation {
  estimatedReward: BigNumber;
  calculateEstimatedReward: () => {};
  loadingEstimatedReward: boolean;
  minTicketWei: BigNumber;
}

interface ICommitFundsEstimationFormValues {
  eth: string;
}

const CommitUnknownUserEstimationComponent: React.SFC<ICommitFundsEstimation> = ({
  estimatedReward,
  calculateEstimatedReward,
  loadingEstimatedReward,
}) => {
  return (
    <form onChange={calculateEstimatedReward}>
      <div className={style.estimationComponent}>
        <p className={style.introduction}>Your estimated reward</p>
        <div className={style.estimation}>
          <div className={style.rightContainer}>
            {loadingEstimatedReward
              ? <LoadingIndicator className={style.loadingIndicator} />
              : <span>
                  <MoneyComponent
                    value={estimatedReward}
                    tokenType={TokenType.NEU}
                    valueClass={style.amount}
                    currencyClass={style.currencyNeu}
                    fit
                  />
                </span>}
          </div>
          <span className={style.separator}> / </span>
          <Field name="ethAmount" component={styledField} validate={[commitmentValueValidator]} />
          <span className={style.currencyEth}>ETH</span>
        </div>
        <p className={style.description}>
          Calculated amount might not be precised, reward will be granted after the block is mined
          and it might depend on the order of transactions.
        </p>
        <p className={style.urls}>
          <IconLink url="#" text="Use MyEtherWallet" />
          <IconLink url="#" text="Go to interactive version of this site for Ethereum browsers" />
        </p>
      </div>
    </form>
  );
};

export default reduxForm<ICommitFundsEstimationFormValues, ICommitFundsEstimation>({
  form: "commitFunds",
})(CommitUnknownUserEstimationComponent);
