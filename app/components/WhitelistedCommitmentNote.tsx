import * as React from "react";
import { Alert } from "react-bootstrap";
import config, { CommitmentType } from "../config";

export const WhitelistedCommitmentNote: React.SFC<{}> = () => {
  if (config.contractsDeployed.commitmentType === CommitmentType.PUBLIC) {
    return null;
  }

  return (
    <Alert bsStyle="info">
      <strong>Note:</strong> You are viewing pre-ICBM commitment page. Only whitelisted accounts are
      allowed.
    </Alert>
  );
};
