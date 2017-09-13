import TextField from "material-ui/TextField";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import * as style from "./CommitFundsStatic.scss";
import { TextCopyable } from "./TextCopyable";

interface ILink {
  url: string;
  text?: string;
}

const Link: React.SFC<ILink> = ({ url, text }) =>
  <a className={style.link} href={url}>
    <i className={`material-icons ${style.iconStyle}`}>link</i>
    {text !== undefined ? text : url}
  </a>;

interface ICommitFundsDesc {
  contractAddress: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
}

const CommitFundsDesc: React.SFC<ICommitFundsDesc> = ({
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
    <Link url="#" text="Use MyEtherWallet" /> <br />
    <Link url="#" text="Go to interactive version of this site for Ethereum browsers" />
  </div>;

interface ICommitFundsStatic {
  contractAddress: string;
  transactionPayload: string;
}

const CommitFundsStatic: React.SFC<ICommitFundsStatic> = ({
  contractAddress,
  transactionPayload,
}) =>
  <div>
    <Row>
      <Col sm={12}>
        <Link url="/" text="New to the blockchain? Read “How to participate”" />
      </Col>
    </Row>
    <Row className={style.contentRow}>
      <Col sm={8}>
        <CommitFundsDesc
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
          gasPrice="2023123"
          gasLimit="200000000"
        />
      </Col>
      <Col sm={4}>
        <CommitFundsEstimation />
      </Col>
    </Row>
  </div>;

export default CommitFundsStatic;
