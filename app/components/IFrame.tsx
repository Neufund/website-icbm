import * as React from "react";

interface IIFrameProps {
  content: string;
  className?: string;
}

export class IFrame extends React.Component<IIFrameProps> {
  public setIFrameContentAndHeight = (iframe: any) => {
    if (!iframe) {
      return;
    }
    // set content
    const content = this.props.content;
    const doc = iframe.contentWindow.document;
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
        ref={this.setIFrameContentAndHeight}
        className={this.props.className}
        scrolling="no"
      />
    );
  }
}
