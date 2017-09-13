import * as React from "react";
import { Col, Row } from "react-bootstrap";

interface ILink {
  url: string;
  text?: string;
}

const Link: React.SFC<ILink> = ({ url, text }) =>
  <a href={url}>
    {text}
  </a>;

interface ICommitFundsDesc {
  contractAddress: string;
  transactionPayload: string;
  gasPrice: number;
  gasLimit: number;
}

const CommitFundsDesc: React.SFC<ICommitFundsDesc> = ({
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
}) =>
  <div>
    <div>
      {contractAddress}
    </div>
    <div>
      {transactionPayload}
    </div>
    <div>
      {gasPrice}
    </div>
    <div>
      {gasLimit}
    </div>
  </div>;

const CommitFundsEstimation: React.SFC = () => <div>reward estimation</div>;

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
    <Row>
      <Col sm={6}>
        <CommitFundsDesc
          contractAddress={contractAddress}
          transactionPayload={transactionPayload}
          gasPrice={2023123}
          gasLimit={200000000}
        />
      </Col>
      <Col sm={6}>
        <CommitFundsEstimation />
      </Col>
    </Row>
  </div>;

export default CommitFundsStatic;
