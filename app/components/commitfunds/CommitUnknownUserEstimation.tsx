import { BigNumber } from "bignumber.js";
import TextField from "material-ui/TextField";
import * as React from "react";
import { Field, reduxForm } from "redux-form";

import { TokenType } from "../../actions/constants";
import * as logo from "../../assets/img/myetherwallet_logo.svg";
import { commitmentValueValidator } from "../../validators/commitmentValueValidator";
import { LoadingIndicator } from "../LoadingIndicator";
import MoneyComponent from "../MoneyComponent";
import * as style from "./CommitUnknownUserEstimation.scss";

const estTextFieldStyles = {
  inputStyle: {
    color: "#000",
    fontWeight: 500 as 500,
    fontSize: "20px",
  },
  hintStyle: {
    color: "#BBC2C7",
    fontWeight: 500 as 500,
    fontSize: "22px",
  },
  style: {
    width: "100px",
    marginRight: "5px",
  },
  errorStyle: {
    position: "absolute",
    top: "50px",
    whiteSpace: "nowrap",
  },
};

const styledField = (props: any) => {
  const computedProps = {
    name: "ether",
    inputStyle: estTextFieldStyles.inputStyle,
    style: estTextFieldStyles.style,
    hintStyle: estTextFieldStyles.hintStyle,
    hintText: "0",
    errorStyle: estTextFieldStyles.errorStyle,
    autoComplete: "off",
    maxLength: props.maxLength,
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
  myEtherWalletUrl: string;
}

interface ICommitFundsEstimationFormValues {
  eth: string;
}

const CommitUnknownUserEstimationComponent: React.SFC<ICommitFundsEstimation> = ({
  estimatedReward,
  calculateEstimatedReward,
  loadingEstimatedReward,
  myEtherWalletUrl,
}) => {
  return (
    <div className={style.container}>
      <form onChange={calculateEstimatedReward}>
        <div className={style.estimationComponent}>
          <p className={style.introduction}>Your estimated reward</p>
          <div className={style.estimation}>
            <Field
              name="ethAmount"
              component={styledField}
              validate={[commitmentValueValidator]}
              props={{ maxLength: 9 }}
            />
            <span className={style.currencyEth}>ETH</span>
            <span className={style.separator}> = </span>
            {loadingEstimatedReward
              ? <LoadingIndicator className={style.loadingIndicator} />
              : <MoneyComponent
                  containerClass={style.amountContainer}
                  value={estimatedReward}
                  tokenType={TokenType.NEU}
                  valueClass={style.amount}
                  currencyClass={style.currencyNeu}
                  fit
                />}
          </div>
          <p className={style.description}>
            Calculated amount might not be precised, reward will be granted after the block is mined
            and it might depend on the order of transactions.
          </p>
        </div>
      </form>
      <div className={style.myEtherWallet}>
        <img className={style.logo} src={logo} />
        Use <a href={myEtherWalletUrl}>MyEtherWallet</a>
      </div>
    </div>
  );
};

export default reduxForm<ICommitFundsEstimationFormValues, ICommitFundsEstimation>({
  form: "commitFunds",
})(CommitUnknownUserEstimationComponent);
