import * as cn from "classnames";
import * as React from "react";

interface ILoadingIndicatorProps {
  className?: string;
}

export const LoadingIndicator: React.SFC<ILoadingIndicatorProps> = ({ className }) =>
  <div className={cn(className, "animated-loading-spinner")} />;
