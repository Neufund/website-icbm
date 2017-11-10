import { BigNumber } from "bignumber.js";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";

import { TokenType } from "../../actions/constants";
import config from "../../config";
import { parseStrToNumStrict } from "../../utils/utils";
import { computeTotalTxCost } from "../../web3/utils";
import { Web3Service } from "../../web3/web3Service";
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
  const gasPrice = Web3Service.instance.rawWeb3.fromWei(config.contractsDeployed.gasPrice, "gwei");
  const gasLimit = parseInt(config.contractsDeployed.gasLimit, 10).toLocaleString();
  const txCost = computeTotalTxCost(new BigNumber(commit));

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
          <div className={style.description}>
            <p>
              Gas price: <b>{gasPrice} gwei</b> <br />
              Gas limit: <b>{gasLimit}</b> <br />
              Total tx value:{" "}
              <b>
                <MoneyComponent value={txCost} tokenType={TokenType.ETHER} decimalPlaces={4} />
              </b>
            </p>
          </div>
        </Col>
        <Col sm={6} className={`${style.area} ${style.right}`}>
          <div className={style.header}>Your estimated reward</div>
          <MoneyComponent
            tokenType={TokenType.NEU}
            value={reward}
            containerClass={style.rewardContainer}
          />
          <div className={style.description}>
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
