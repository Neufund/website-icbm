import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { Field, formValues, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";

import { TokenType } from "../../actions/constants";
import config from "../../config";
import { parseStrToNumStrict } from "../../utils/utils";
import { commitmentValueValidator } from "../../validators/commitmentValueValidator";
import { computeTotalTxCost } from "../../web3/utils";
import { Web3Service } from "../../web3/web3Service";
import { LoadingIndicator } from "../LoadingIndicator";
import MoneyComponent from "../MoneyComponent";
import * as style from "./CommitKnownUserForm.scss";

// IMPORTANT
// Keep in mind that this component has similar structure and share styles with TransactionCommittedMoneyComponent be careful when changing

const inputFieldStyles = {
  hintStyle: {
    color: "#A3C0CC",
    fontFamily: "Montserrat",
    fontWeight: 500 as 500, // https://github.com/Microsoft/TypeScript/issues/9489
    fontSize: "40px",
  },
  inputStyle: {
    color: "#D5E20F",
    fontWeight: 500 as 500,
    fontSize: "40px",
  },
  underlineStyle: {
    borderBottomWidth: "2px",
    borderBottomColor: "#A3C0CC",
    bottom: "3px",
  },
  underlineFocusStyle: {
    borderBottomColor: "#D5E20F",
  },
  errorStyle: {
    position: "absolute",
    top: "50px",
  },
};

const styledField = (props: any) => {
  const computedProps = {
    name: "inputName",
    hintStyle: inputFieldStyles.hintStyle,
    inputStyle: inputFieldStyles.inputStyle,
    underlineStyle: inputFieldStyles.underlineStyle,
    underlineFocusStyle: inputFieldStyles.underlineFocusStyle,
    errorStyle: inputFieldStyles.errorStyle,
    fullWidth: true,
    hintText: "min 1.0",
    autoComplete: "off",
    maxLength: props.maxLength,
    ...props.input,
  };

  if (!props.meta.pristine && props.meta.error) {
    computedProps.errorText = props.meta.error;
  }

  return <TextField {...computedProps} />;
};

interface ICommitKnownUserFormProps {
  handleSubmit?: () => {};
  submit?: () => {};
  calculateEstimatedReward?: () => {};
  invalid?: boolean;
  ethAmount?: string;
  minTicketWei: BigNumber;
  userBalance: BigNumber;
  estimatedReward: BigNumber;
  loadingEstimatedReward: boolean;
}

const CommitKnownUserForm = ({
  handleSubmit,
  submit,
  ethAmount,
  calculateEstimatedReward,
  invalid,
  estimatedReward,
  loadingEstimatedReward,
}: ICommitKnownUserFormProps) => {
  const gasPrice = Web3Service.instance.rawWeb3.fromWei(config.contractsDeployed.gasPrice, "gwei");
  const gasLimit = parseInt(config.contractsDeployed.gasLimit, 10).toLocaleString();

  let txCost = new BigNumber(0);
  const parsedAmount = parseStrToNumStrict(ethAmount);
  if (!isNaN(parsedAmount) && parsedAmount > 0) {
    const weiAmount = new BigNumber(Web3Service.instance.rawWeb3.toWei(parsedAmount, "ether"));
    txCost = computeTotalTxCost(weiAmount);
  }

  return (
    <Grid>
      <Row className={style.container}>
        <Col sm={6} className={`${style.area} ${style.hasButton} ${style.left}`}>
          <div className={style.header}>How much ETH would you like to commit?</div>
          <form onSubmit={handleSubmit} className={style.form} onChange={calculateEstimatedReward}>
            <div className={style.inputContainer}>
              <div className={style.input}>
                <Field
                  name="ethAmount"
                  component={styledField}
                  props={{ maxLength: 9 }}
                  validate={[commitmentValueValidator]}
                />
              </div>
              <div className={style.currencyDeposit}>ETH</div>
            </div>
          </form>
          <div className={style.description}>
            <p>
              Gas price: <b>{gasPrice} gwei</b> <br />
              Gas limit: <b>{gasLimit}</b> <br />
              Total transaction value:{" "}
              <b>
                <MoneyComponent value={txCost} tokenType={TokenType.ETHER} decimalPlaces={4} />
              </b>
            </p>
          </div>
          <div
            onClick={submit}
            className={invalid ? style.commit : `${style.valid} ${style.commit}`}
            data-test-id="commit-btn"
            data-test-valid={!invalid}
          >
            Commit ETH
          </div>
        </Col>
        <Col sm={6} className={`${style.area} ${style.hasButton} ${style.right}`}>
          <div className={style.header}>Your estimated reward</div>
          {loadingEstimatedReward
            ? <LoadingIndicator className={style.rewardLoadingIndicator} />
            : <MoneyComponent
                data-test-id="estimated-reward-value"
                value={estimatedReward}
                tokenType={TokenType.NEU}
                containerClass={style.rewardContainer}
              />}
          <div className={style.description}>
            <p>
              The reward will be granted after the block is mined. It might depend on the order of
              transactions.
            </p>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

const DecoratedCommitFundsForm: any = formValues<ICommitKnownUserFormProps>("ethAmount")(
  CommitKnownUserForm
);

export interface ICommitKnownUserFormValues {
  ethAmount: string;
}

export default reduxForm<ICommitKnownUserFormValues, ICommitKnownUserFormProps>({
  form: "commitFunds",
})(DecoratedCommitFundsForm);
