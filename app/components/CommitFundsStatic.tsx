import TextField from "material-ui/TextField";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import * as style from "./CommitFundsStatic.scss";
import { IconLink } from "./IconLink";
import { TextCopyable } from "./TextCopyable";

interface ICommitFundsStaticDesc {
  contractAddress: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
}

const CommitFundsStaticDesc: React.SFC<ICommitFundsStaticDesc> = ({
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
}) =>
  <div className={style.infoContainer}>
    Include following description in your transaction:<br />
    <TextCopyable className={style.textCopyable} text={contractAddress} /> <br />
    Ethereum smart contract address:<br />
    <TextCopyable className={style.textCopyable} text={transactionPayload} /> <br />
    <Row className={style.gasSection}>
      <Col sm={3}>
        Suggested gas price<br />
        <TextCopyable className={style.textCopyable} text={gasPrice} />
      </Col>
      <Col sm={9}>
        Suggested gas limit<br />
        <TextCopyable className={style.textCopyable} text={gasLimit} />
      </Col>
    </Row>
  </div>;

const CommitFundsDescProps = () => ({
  contractAddress: "0x6895304785c271b827f1990860d5093e30d2a121",
  transactionPayload: "0x3c7a3aff",
  gasPrice: "5440",
  gasLimit: "2000000",
});

const CommitFundsStaticConnected = connect(null, null, CommitFundsDescProps)(CommitFundsStaticDesc);

const estimationTextFieldStyle = {
  width: "200px",
};

const CommitFundsEstimation: React.SFC = () =>
  <div className={style.estimationComponent}>
    <p className={style.introduction}>Your estimated reward</p>
    <div className={style.estimation}>
      <span className={style.amount}>1.1234</span> <span className={style.currencyNeu}>NEU</span> / {" "}
      <TextField style={estimationTextFieldStyle} />
      <span className={style.currencyETH}>ETH</span>
    </div>
    <p className={style.description}>
      Calculated amount might not be precised, reward will be granted after the block is mined and
      it might depend on the order of transactions.
    </p>
    <IconLink url="#" text="Use MyEtherWallet" /> <br />
    <IconLink url="#" text="Go to interactive version of this site for Ethereum browsers" />
  </div>;

export const CommitFundsStatic: React.SFC = () =>
  <div>
    <Row>
      <Col sm={12}>
        <IconLink url="/" text="New to the blockchain? Read “How to participate”" />
      </Col>
    </Row>
    <Row className={style.contentRow}>
      <Col sm={8}>
        <CommitFundsStaticConnected />
      </Col>
      <Col sm={4}>
        <CommitFundsEstimation />
      </Col>
    </Row>
  </div>;
