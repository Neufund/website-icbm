import * as React from "react";
import { Link } from "react-router";
import { LoadingIndicator } from "../LoadingIndicator";
import { UserInfo } from "../UserInfo";
import { CommitHeaderComponent } from "./CommitHeaderComponent";

export class TxConfirmationComponent extends React.Component {
  public render() {
    return (
      <div>
        <CommitHeaderComponent number="02" title="Confirm transaction" />
        <UserInfo />
        <p>
          Please confirm your transcation using signer or{" "}
          <Link to="/commit">back to change your commit</Link>.
        </p>
        <LoadingIndicator />
      </div>
    );
  }
}

export const TxConfirmation = TxConfirmationComponent;
