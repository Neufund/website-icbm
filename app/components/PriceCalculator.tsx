import TextField from "material-ui/TextField";
import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { LoadingIndicator } from "./LoadingIndicator";
import * as style from "./PriceCalculator.scss";

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
  estimatedReward: number;
  calculateEstimatedReward: () => {};
  loadingEstimatedReward: boolean;
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
    <div>
      <form onKeyUp={calculateEstimatedReward}>
        <div className={style.estimationComponent}>
          <p className={style.introduction}>Calculate your estimated reward:</p>
          <div className={style.estimation}>
            <div className={style.rightContainer}>
              {loadingEstimatedReward
                ? <LoadingIndicator className={style.loadingIndicator} />
                : <span>
                    <span className={style.amount}>{estimatedReward.toFixed(2)}</span>{" "}
                    <span className={style.currencyNeu}>NEU</span>
                  </span>}
            </div>
            <span className={style.separator}> / </span>
            <Field name="ethAmount" component={styledField} />
            <span className={style.currencyEth}>ETH</span>
          </div>
          <p className={style.description}>
            Calculated amount might not be precised, reward will be granted after the block is mined
            and it might depend on the order of transactions.
          </p>
        </div>
      </form>
    </div>
  );
};

export default reduxForm<ICommitFundsEstimationFormValues, ICommitFundsEstimation>({
  form: "commitFunds",
})(CommitUnknownUserEstimationComponent);
