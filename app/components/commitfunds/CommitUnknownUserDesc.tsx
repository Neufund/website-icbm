import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { TokenType } from "../../actions/constants";
import MoneyComponent from "../MoneyComponent";
import { TextCopyable } from "../TextCopyable";
import { UnderlinedLink } from "../UnderlinedLink";
import * as style from "./CommitUnknownUserDesc.scss";

interface ICommitUnknownUserDesc {
  contractAddress: string;
  transactionPayload: string;
  gasPrice: string;
  gasLimit: string;
  minTicketSize: BigNumber;
}

export const CommitUnknownUserDesc: React.SFC<ICommitUnknownUserDesc> = ({
  contractAddress,
  transactionPayload,
  gasPrice,
  gasLimit,
  minTicketSize,
}) =>
  <div className={style.infoContainer}>
    <p>
      Include following data in your transaction:<br />
      <TextCopyable copyIconOnRight className={style.textCopyable} text={transactionPayload} />
    </p>
    <p>
      Ethereum smart contract address:<br />
      <TextCopyable copyIconOnRight className={style.textCopyable} text={contractAddress} /> <br />
      <UnderlinedLink
        href="https://etherscan.io/address/0xf432cec23b2a0d6062b969467f65669de81f4653"
        className={style.verifyLink}
      >
        Verify source code on Etherscan
      </UnderlinedLink>
    </p>
    <Row className={style.gasSection}>
      <Col sm={4}>
        Suggested gas price<br />
        <TextCopyable copyIconOnRight className={style.textCopyable} text={gasPrice} />
      </Col>
      <Col sm={4}>
        Suggested gas limit<br />
        <TextCopyable copyIconOnRight className={style.textCopyable} text={gasLimit} />
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
  </div>;
