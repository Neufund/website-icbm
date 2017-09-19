import TextField from "material-ui/TextField";
import * as React from "react";
import { estimateNeufromEth, parseStrToNumStrict } from "../../utils/utils";
import { IconLink } from "../IconLink";
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

interface ICommitFundsEstimation {
  eth: string;
  neu: number;
  onChange: any;
}

const CommitUnknownUserEstimationComponent: React.SFC<ICommitFundsEstimation> = ({
  eth,
  neu,
  onChange,
}) =>
  <div className={style.estimationComponent}>
    <p className={style.introduction}>Your estimated reward</p>
    <div className={style.estimation}>
      <span className={style.amount}>{neu}</span> <span className={style.currencyNeu}>NEU</span>
      <span className={style.separator}> / </span>
      <TextField
        name="convertETH"
        inputStyle={estTextFieldStyles.inputStyle}
        style={estTextFieldStyles.style}
        hintStyle={estTextFieldStyles.hintStyle}
        hintText="0"
        value={eth}
        onChange={onChange}
      />
      <span className={style.currencyEth}>ETH</span>
    </div>
    <p className={style.description}>
      Calculated amount might not be precised, reward will be granted after the block is mined and
      it might depend on the order of transactions.
    </p>
    <p className={style.urls}>
      <IconLink url="#" text="Use MyEtherWallet" />
      <IconLink url="#" text="Go to interactive version of this site for Ethereum browsers" />
    </p>
  </div>;

interface IProps {
  estimationCoefficient: number;
}

interface IState {
  eth: string;
  neu: number;
}

export class CommitUnknownUserEstimation extends React.Component<IProps, IState> {
  public estimateNeufromEth: (eth: number) => number;

  constructor(props: IProps) {
    super();
    const { estimationCoefficient } = props;
    this.state = {
      eth: "",
      neu: 0,
    };
    this.estimateNeufromEth = estimateNeufromEth(estimationCoefficient);
  }

  public render() {
    return (
      <CommitUnknownUserEstimationComponent
        eth={this.state.eth}
        neu={this.state.neu}
        onChange={this.change}
      />
    );
  }

  private change = (_event: object, newValue: string): void => {
    const eth = parseStrToNumStrict(newValue);

    this.setState({
      eth: newValue,
      neu: !isNaN(eth) ? this.estimateNeufromEth(eth) : 0,
    });
  };
}
