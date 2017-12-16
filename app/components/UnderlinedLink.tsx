import * as cn from "classnames";
import * as React from "react";
import { Link } from "react-router";
import * as styles from "./UnderlinedLink.scss";

interface IUnderlinedLinkProps {
  href: string;
  className?: string;
  internal?: boolean;
}

export const UnderlinedLink: React.SFC<IUnderlinedLinkProps> = ({
  href,
  className,
  children,
  internal,
}) => {
  if (internal) {
    return (
      <Link to={href} className={cn(className, styles.underlinedLink)}>
        {children}
      </Link>
    );
  } else {
    return (
      <a href={href} className={cn(className, styles.underlinedLink)} target="_blank">
        {children}
      </a>
    );
  }
};
