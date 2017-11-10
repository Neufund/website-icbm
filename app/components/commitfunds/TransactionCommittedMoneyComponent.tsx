import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";

import { TokenType } from "../../actions/constants";
import MoneyComponent from "../MoneyComponent";
import * as style from "./CommitKnownUserForm.scss";

// IMPORTANT
// Keep in mind that this component has similar structure and share styles with CommitKnownUserForm be careful when changing

interface ITransactionCommittedMoneyComponent {
  commit: BigNumber | string;
  reward: BigNumber | string;
}

export const TransactionCommittedMoneyComponent: React.SFC<ITransactionCommittedMoneyComponent> = ({
  commit,
  reward,
}) => {
  return (
    <Grid>
      <Row className={style.container}>
        <Col sm={6} className={`${style.area} ${style.left}`}>
          <div className={style.header}>Your commit</div>
          <MoneyComponent
            tokenType={TokenType.ETHER}
            value={commit}
            containerClass={style.rewardContainer}
          />
        </Col>
        <Col sm={6} className={`${style.area} ${style.right}`}>
          <div className={style.header}>Your estimated reward</div>
          <MoneyComponent
            tokenType={TokenType.NEU}
            value={reward}
            containerClass={style.rewardContainer}
          />
          <div className={style.description}>
            <p>Calculated amount might not be precised.</p>
            <p>
              Reward will be granted after the block is mined and it might depend on the order of
              transactions.
            </p>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};
