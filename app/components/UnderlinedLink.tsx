import * as React from "react";
import * as styles from "./UnderlinedLink.scss";

interface IUnderlinedLinkProps {
  href: string;
  className?: string;
}

export const UnderlinedLink: React.SFC<IUnderlinedLinkProps> = ({ href, className, children }) =>
  <a
    href={href}
    className={
      className !== undefined ? `${styles.underlinedLink} ${className}` : styles.underlinedLink
    }
  >
    {children}
  </a>;
