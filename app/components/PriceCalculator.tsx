import TextField from "material-ui/TextField";
import * as React from "react";
import { Textfit } from "react-textfit";
import { Field, reduxForm } from "redux-form";
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
    maxLength: props.maxLength,
    ...props.input,
  };

  if (!props.meta.pristine && props.meta.error) {
    computedProps.errorText = props.meta.error;
    estTextFieldStyles.inputStyle.color = "red";
  } else {
    estTextFieldStyles.inputStyle.color = "#BBC2C7";
  }

  return <TextField {...computedProps} />;
};

const number = (value: any) => {
  const newValue = value ? value.replace(",", ".") : "";
  return newValue && (isNaN(Number(newValue)) || parseFloat(newValue) < 0);
};

interface ICommitFundsEstimation {
  rewardForOneEth: number;
  estimatedReward: number;
  calculateEstimatedReward: () => {};
}

interface ICommitFundsEstimationFormValues {
  eth: string;
}

const CommitUnknownUserEstimationComponent: React.SFC<ICommitFundsEstimation> = ({
  rewardForOneEth,
  estimatedReward,
  calculateEstimatedReward,
}) => {
  return (
    <div>
      <p className={style.preTextPargraph}>
        In the ICBM you get NEU now for your willingness to fund companies later. On top of that we
        incentivize early birds. NEU reward is the highest at the start of the ICBM, then the early
        bird bonus decreases as the committed capital pool grows.
      </p>
      <strong className={style.preTextPargraph}>
        Current NEU reward: {rewardForOneEth.toFixed(2)} NEU / 1 ETH
      </strong>

      <form onKeyUp={calculateEstimatedReward}>
        <div className={style.estimationComponent}>
          <p className={style.introduction}>Calculate your estimated reward:</p>
          <div className={style.estimation}>
            <div className={style.rightContainer}>
              <span>
                <Textfit mode="single" max={18} className={style.amount}>
                  {estimatedReward.toFixed(2)}{" "}
                </Textfit>

                <span className={style.currencyNeu}>NEU</span>
              </span>
            </div>
            <span className={style.separator}> / </span>
            <Field
              name="ethAmount"
              component={styledField}
              props={{ maxLength: 9 }}
              validate={[number]}
            />
            <span className={style.currencyEth}>ETH</span>
          </div>
          <p className={style.description}>
            Calculated amount is an estimation. The NEU reward will be granted after the block is
            mined and it might depend on the order of transactions. ICBM will be performed with a
            initial NEU to ETH rate of 942.5 NEU/ETH.
          </p>
        </div>
      </form>
    </div>
  );
};

export default reduxForm<ICommitFundsEstimationFormValues, ICommitFundsEstimation>({
  form: "commitFunds",
})(CommitUnknownUserEstimationComponent);
