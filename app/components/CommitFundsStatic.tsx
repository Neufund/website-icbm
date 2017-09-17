import TextField from "material-ui/TextField";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import * as style from "./CommitFundsStatic.scss";
import { IconLink } from "./IconLink";
import { TextCopyable } from "./TextCopyable";
import { UnderlinedLink } from "./UnderlinedLink";

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
    <p>
      Include following description in your transaction:<br />
      <TextCopyable className={style.textCopyable} text={transactionPayload} />
    </p>
    <p>
      Ethereum smart contract address:<br />
      <TextCopyable className={style.textCopyable} text={contractAddress} /> <br />
      <UnderlinedLink href="#" className={style.verifyLink}>
        Verify source code on Etherscan
      </UnderlinedLink>
    </p>
    <Row className={style.gasSection}>
      <Col sm={4}>
        Suggested gas price<br />
        <TextCopyable className={style.textCopyable} text={gasPrice} />
      </Col>
      <Col sm={8}>
        Suggested gas limit<br />
        <TextCopyable className={style.textCopyable} text={gasLimit} />
      </Col>
    </Row>
  </div>;

const estTextFieldStyles = {
  inputStyle: {
    color: "#BBC2C7",
    fontWeight: 500 as 500,
    fontSize: "22px",
  },
  style: {
    width: "180px",
    marginLeft: "5px",
    marginRight: "5px",
  },
};

const CommitFundsEstimation: React.SFC = () =>
  <div className={style.estimationComponent}>
    <p className={style.introduction}>Your estimated reward</p>
    <div className={style.estimation}>
      <span className={style.amount}>1.1234</span> <span className={style.currencyNeu}>NEU</span>
      <span className={style.separator}> / </span>
      <TextField inputStyle={estTextFieldStyles.inputStyle} style={estTextFieldStyles.style} />
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

interface ICommitFundsStatic {
  contractAddress: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
}

export const CommitFundsStatic: React.SFC<ICommitFundsStatic> = ({
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
}) =>
  <div>
    <Row className={style.initialLink}>
      <Col sm={12}>
        <IconLink url="/" text="New to the blockchain? Read “How to participate”" />
      </Col>
    </Row>
    <Row className={style.contentRow}>
      <Col sm={8}>
        <CommitFundsStaticDesc
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
          gasPrice={gasPrice}
          gasLimit={gasLimit}
        />
      </Col>
      <Col sm={4}>
        <CommitFundsEstimation />
      </Col>
    </Row>
  </div>;
