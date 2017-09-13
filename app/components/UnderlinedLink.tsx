import * as React from "react";

import * as styles from "./UnderlinedLink.scss";

interface IUnderlinedLinkProps {
  href: string;
}

export const UnderlinedLink: React.SFC<IUnderlinedLinkProps> = ({ href, children }) =>
  <a href={href} className={styles.underlinedLink}>
    {children}
  </a>;
