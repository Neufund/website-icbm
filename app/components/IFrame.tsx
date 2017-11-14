import * as React from "react";

interface IIFrameProps {
  content: string;
  className?: string;
}

export class IFrame extends React.Component<IIFrameProps> {
  private iframeRef: any;

  public componentWillReceiveProps(newProps: IIFrameProps) {
    if (newProps.content !== this.props.content) {
      this.setIFrameContentAndHeight(this.props.content);
    }
  }

  public setIFrameContentAndHeight = (content: string, iframe: any = this.iframeRef) => {
    this.iframeRef = iframe;
    if (!iframe || !content) {
      return;
    }
    // set content
    const doc = iframe.contentWindow.document;
    doc.clear();
    doc.open();
    doc.write(content);
    doc.close();
    // set height
    iframe.height = iframe.contentWindow.document.body.scrollHeight;
  };

  public render() {
    return (
      <iframe
        id="ifmcontentstoprint"
        ref={ref => this.setIFrameContentAndHeight(this.props.content, ref)}
        className={this.props.className}
        scrolling="no"
      />
    );
  }
}
