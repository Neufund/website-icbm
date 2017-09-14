import { BigNumber } from "bignumber.js";
import { Moment } from "moment";
import * as React from "react";

import * as styles from "./Aftermath.scss";
import { UnderlinedLink } from "./UnderlinedLink";

interface IAftermathProps {
  userAddress: string;
  lockedAmount: BigNumber;
  unlockDate: Moment;
  neumarkBalance: BigNumber;
}

export const Aftermath: React.SFC<IAftermathProps> = ({
  userAddress,
  lockedAmount,
  unlockDate,
  neumarkBalance,
}) =>
  <div className={styles.aftermath}>
    <div>
      <div className={styles.header}>Sneak peak to your committed funds</div>
      <UnderlinedLink href="#">
        If you want to see your transactions, go to etherscan.io
      </UnderlinedLink>
    </div>

    <div className={styles.infoBox}>
      <div className={styles.caption}>For address</div>
      <div className={styles.value}>
        {userAddress}
      </div>
    </div>

    <div className={styles.infoBox}>
      <div className={styles.caption}>Locked amount</div>
      <div className={styles.value}>
        {lockedAmount.toString()} ETH {/* todo: probably we will get it in wei */}
      </div>
    </div>

    <div className={styles.infoBox}>
      <div className={styles.caption}>Unlock date</div>
      <div className={styles.value}>
        {unlockDate.format("YYYY-MM-DD")}
      </div>
    </div>

    <div className={styles.infoBox}>
      <div className={styles.caption}>Neumark balance</div>
      <div className={styles.value}>
        {neumarkBalance.toString()} NEU
      </div>
    </div>
  </div>;
