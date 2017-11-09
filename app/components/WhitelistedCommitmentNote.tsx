import * as React from "react";
import { Alert } from "react-bootstrap";

import config, { CommitmentType } from "../config";
import * as styles from "./WhitelistedCommitmentNote.scss";

export const WhitelistedCommitmentNote: React.SFC<{}> = () => {
  if (config.contractsDeployed.commitmentType === CommitmentType.PUBLIC) {
    return null;
  }

  return (
    <Alert bsStyle="info" className={styles.whitelistedNote}>
      <strong>Note:</strong> You are viewing pre-ICBM commitment page. Only whitelisted accounts are
      allowed.
    </Alert>
  );
};
