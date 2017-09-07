import TextField from "material-ui/TextField";
import * as React from "react";
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
  },
};

interface ICommitFundsFormProps {
  filled: boolean;
}

export const CommitFundsForm: React.SFC<ICommitFundsFormProps> = ({ filled }) =>
  <div className={style.formContainer}>
    <div className={style.formBody}>
      <div className={style.input}>
        <TextField
          floatingLabelStyle={inputFieldStyles.floatingLabelStyle}
          floatingLabelFocusStyle={inputFieldStyles.floatingLabelFocusStyle}
          floatingLabelShrinkStyle={inputFieldStyles.floatingLabelFocusStyle}
          hintStyle={inputFieldStyles.floatingLabelStyle}
          inputStyle={inputFieldStyles.inputStyle}
          underlineStyle={inputFieldStyles.underlineStyle}
          fullWidth
          hintText="Fill the ammount"
          floatingLabelText="The ETH to be committed"
        />
      </div>
      <p className={style.reward}>Your estimated reward</p>
      <p className={style.amount}>
        123.123 <span className={style.currency}>NEU</span>
      </p>
      <p className={style.description}>
        Calculated amount might not be precised, reward will be granted after the block is mined and
        it might depend on the order of transactions.
      </p>
    </div>
    <div className={style.formSubmit}>Commit ETH</div>
  </div>;
