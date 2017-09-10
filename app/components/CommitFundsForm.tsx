import IconButton from "material-ui/IconButton";
import * as React from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";
import * as image from "../assets/img/commit_form_hex.png";
import * as style from "./CommitFundsForm.scss";

const inputFieldStyles = {
  floatingLabelStyle: {
    color: "#A3C0CC",
    fontFamily: "Montserrat",
    fontWeight: 500 as 500,
    fontSize: "22px",
  },
  floatingLabelFocusStyle: {
    color: "#FFF",
    fontFamily: "Montserrat",
    fontWeight: 300 as 300, // https://github.com/Microsoft/TypeScript/issues/9489
    fontSize: "12px",
  },
  inputStyle: {
    color: "#D5E20F",
    fontWeight: 500 as 500,
    fontSize: "22px",
  },
  underlineStyle: {
    borderBottomWidth: "2px",
    borderBottomColor: "#A3C0CC",
    bottom: "5px",
  },
  underlineFocusStyle: {
    borderBottomColor: "#D5E20F",
  },
};

const iconStyles = {
  style: {
    height: "20px",
    width: "40px",
    padding: "0px 10px",
    verticalAlign: "middle",
  },
  iconStyle: {
    color: "#A3C0CC",
    fontSize: "20px",
  },
};

const styledField = (field: any) =>
  <TextField
    name="inputName"
    floatingLabelStyle={inputFieldStyles.floatingLabelStyle}
    floatingLabelFocusStyle={inputFieldStyles.floatingLabelFocusStyle}
    floatingLabelShrinkStyle={inputFieldStyles.floatingLabelFocusStyle}
    hintStyle={inputFieldStyles.floatingLabelStyle}
    inputStyle={inputFieldStyles.inputStyle}
    underlineStyle={inputFieldStyles.underlineStyle}
    underlineFocusStyle={inputFieldStyles.underlineFocusStyle}
    fullWidth
    hintText="Fill the ammount"
    floatingLabelText="The ETH to be committed"
    {...field.input}
  />;

interface ICommitFundsFormProps {
  props?: any;
}

const CommitFundsForm = (props: any) => {
  const { handleSubmit, submit } = props;
  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <div className={style.formBody}>
        <div className={style.inputContainer}>
          <div className={style.input}>
            <Field name="inputName" component={styledField} />
            <div className={style.currencyDeposit}>ETH</div>
          </div>
          <IconButton
            iconClassName="material-icons"
            style={iconStyles.style}
            iconStyle={iconStyles.iconStyle}
            tooltip="Missing description text"
          >
            info_outline
          </IconButton>
        </div>
        <p className={style.reward}>Your estimated reward</p>
        <p className={style.amount}>
          123.123 <span className={style.currency}>NEU</span>
        </p>
        <p className={style.description}>
          Calculated amount might not be precised, reward will be granted after the block is mined
          and it might depend on the order of transactions.
        </p>
      </div>
      <div onClick={submit} className={style.formSubmit}>
        Commit ETH
      </div>
      <img className={style.hex} src={image} />
    </form>
  );
};

interface IFormInterface {
  inputName: number;
}

export default reduxForm<IFormInterface, ICommitFundsFormProps>({
  form: "commitFunds",
  onSubmit: values => {
    console.log(values);
    return {};
  },
})(CommitFundsForm);
/*
interface IConnectInterface {
  ammount: any;
}

const selector = formValueSelector("commitfunds");
const SelectingFormValuesForm = connect<IConnectInterface>(state => {
  return { ammount: selector(state, "inputName") };
})(DecoratedCommitFundsForm);

export default SelectingFormValuesForm;
*/
