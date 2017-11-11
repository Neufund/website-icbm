import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { TokenType } from "../../actions/constants";
import { Web3Service } from "../../web3/web3Service";
import MoneyComponent from "../MoneyComponent";
import { TextCopyable } from "../TextCopyable";
import { UnderlinedLink } from "../UnderlinedLink";
import * as style from "./CommitUnknownUserDesc.scss";

interface ICommitUnknownUserDesc {
  contractAddress: string;
  etherScanUrl: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
  minTicketSize: BigNumber;
}

export const CommitUnknownUserDesc: React.SFC<ICommitUnknownUserDesc> = ({
  contractAddress,
  etherScanUrl,
  transactionPayload,
  gasPrice,
  gasLimit,
  minTicketSize,
}) => {
  const gasInGwei = Web3Service.instance.rawWeb3.fromWei(gasPrice, "gwei");
  const formattedLimit = parseInt(gasLimit, 10).toLocaleString();

  return (
    <div className={style.infoContainer}>
      <p>
        Please include it in your transaction<br />
        Transaction data:<br />
        <TextCopyable copyIconOnRight className={style.textCopyable} text={transactionPayload} />
      </p>
      <p>
        Ethereum smart contract address:<br />
        <TextCopyable copyIconOnRight className={style.textCopyable} text={contractAddress} />{" "}
        <br />
        <UnderlinedLink href={etherScanUrl} className={style.verifyLink}>
          Verify source code on Etherscan
        </UnderlinedLink>
      </p>
      <Row className={style.gasSection}>
        <Col sm={4}>
          Suggested gas price<br />
          <TextCopyable
            copyIconOnRight
            className={style.textCopyable}
            clipText={gasInGwei}
            text={`${gasInGwei} gwei`}
          />
        </Col>
        <Col sm={4}>
          Gas limit:<br />
          <TextCopyable
            copyIconOnRight
            className={style.textCopyable}
            clipText={gasLimit}
            text={formattedLimit}
          />
        </Col>
        <Col sm={4}>
          Minimum ticket size<br />
          <MoneyComponent
            containerClass={style.ethAmount}
            tokenType={TokenType.ETHER}
            value={minTicketSize}
          />
        </Col>
      </Row>
    </div>
  );
};
