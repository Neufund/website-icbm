import * as cn from "classnames";
import * as React from "react";
import * as styles from "./UnderlinedLink.scss";

interface IUnderlinedLinkProps {
  href: string;
  className?: string;
}

export const UnderlinedLink: React.SFC<IUnderlinedLinkProps> = ({ href, className, children }) =>
  <a href={href} className={cn(className, styles.underlinedLink)}>
    {children}
  </a>;
