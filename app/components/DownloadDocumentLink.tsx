import * as cn from "classnames";
import * as React from "react";

import { downloadAgreement } from "../agreements/downloadAgreement";
import { IDictionary } from "../types";
import * as styles from "./DownloadDocumentLink.scss";
import { LoadingIndicator } from "./LoadingIndicator";

interface IDownloadDocumentLinkProps {
  documentHash: string;
  outputFilename: string;
  getTags: () => Promise<IDictionary>;
}

interface IDownloadDocumentLinkState {
  isLoading: boolean;
}

export class DownloadDocumentLink extends React.Component<
  IDownloadDocumentLinkProps,
  IDownloadDocumentLinkState
> {
  public constructor(props: IDownloadDocumentLinkProps) {
    super(props);
    this.state = { isLoading: false };
  }

  public render() {
    return (
      <div className={cn(styles.link, { active: !this.state.isLoading })} onClick={this.onClick}>
        <i className={cn("material-icons", styles.icon)}>file_download </i>
        <span className={styles.label}>
          {this.props.children}
        </span>
        {this.state.isLoading && <LoadingIndicator className={styles.loadingIndicator} />}
      </div>
    );
  }

  private onClick = async () => {
    if (this.state.isLoading) {
      return;
    }
    this.setState({
      isLoading: true,
    });
    const { documentHash, outputFilename, getTags } = this.props;

    const tags = await getTags();
    await downloadAgreement(documentHash, tags, outputFilename);

    this.setState({
      isLoading: false,
    });
  };
}
