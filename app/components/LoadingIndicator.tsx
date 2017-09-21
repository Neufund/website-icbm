import * as cn from "classnames";
import * as React from "react";

import * as styles from "./LoadingIndicator.scss";

interface ILoadingIndicatorProps {
  className?: string;
}

export const LoadingIndicator: React.SFC<ILoadingIndicatorProps> = ({ className }) =>
  <div className={cn(className, styles.spinner)} />;
