import { BigNumber } from "bignumber.js";
import * as React from "react";
import config from "../config";

import { connect } from "react-redux";
import { InvestorType, TokenType, Web3Type, web3TypeToString } from "../actions/constants";
import { IAppState } from "../reducers/index";
import { selectBalance, selectReservedTicket } from "../reducers/userState";
import MoneyComponent from "./MoneyComponent";
import { TextCopyable } from "./TextCopyable";

import { Col, Row } from "react-bootstrap";
import { HiResImage } from "./HiResImage";
import { Image } from "./Image";
import * as styles from "./UserInfo.scss";

interface IUserAddressComponentProps {
  address: string;
  balance: BigNumber;
  web3Provider: Web3Type;
  investorType: InvestorType;
  reservedTicket: BigNumber;
}

function mapWeb3TypeToIcon(web3Type: Web3Type): string {
  switch (web3Type) {
    case Web3Type.METAMASK:
      return "logo_metamask";
    case Web3Type.MIST:
      return "logo_mist";
    case Web3Type.PARITY:
      return "logo_parity";
    default:
      return undefined;
  }
}

const WalletIcon: React.SFC<{ web3Type: Web3Type }> = ({ web3Type }) => {
  const iconPath = mapWeb3TypeToIcon(web3Type);

  if (!iconPath) {
    return <div />;
  }

  return <HiResImage partialPath={`wallet_selector/${iconPath}`} altText={web3Type} />;
};

export const UserInfoComponent: React.SFC<IUserAddressComponentProps> = ({
  address,
  web3Provider,
  balance,
  investorType,
  reservedTicket,
}) =>
  <Row>
    <Col sm={6}>
      <div className={styles.userAddressContainer}>
        <div className={styles.section}>
          <div className={styles.label}>Your wallet:</div>
          <div className={styles.value}>
            {web3TypeToString(web3Provider)}
          </div>
          <div className={styles.icon}>
            <WalletIcon web3Type={web3Provider} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Your balance:</div>
          <div className={styles.value}>
            <MoneyComponent tokenType={TokenType.ETHER} value={balance} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Your wallet address:</div>
          <div className={styles.value}>
            <TextCopyable text={address} copyIconOnRight />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>ICBM Phase:</div>
          <div className={styles.value}>
            {investorType}
          </div>
        </div>

        {reservedTicket.gt(new BigNumber(0)) &&
          <div className={styles.section}>
            <div className={styles.label}>Reserved ticked:</div>
            <div className={styles.value}>
              <MoneyComponent tokenType={TokenType.ETHER} value={reservedTicket} />
            </div>
          </div>}
      </div>
    </Col>
    <Col sm={6}>
      <div className={styles.userAddressContainer}>
        <div className={styles.section}>
          <div className={styles.label}>Commitment smart contract address:</div>
          <div className={styles.value}>
            <TextCopyable
              text={config.contractsDeployed.commitmentContractAddress}
              copyIconOnRight
            />
          </div>
          <div className={styles.icon}>
            <Image partialPath="wallet_selector/neufund_logo" altText="Neufund" />
          </div>
        </div>
      </div>
    </Col>
  </Row>;

export const UserInfo = connect((state: IAppState) => ({
  address: state.userState.address,
  balance: selectBalance(state.userState),
  web3Provider: state.web3State.web3Type,
  investorType: state.userState.investorType,
  reservedTicket: selectReservedTicket(state.userState),
}))(UserInfoComponent);
