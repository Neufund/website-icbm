import * as cn from "classnames";
import * as React from "react";
import * as styles from "./HexagonsStack.scss";

interface IHexagonsStackProps {
  children: React.ReactNode;
  className?: string;
  textContainerClassName?: string;
}

export const HexagonsStack: React.SFC<IHexagonsStackProps> = ({
  children,
  className,
  textContainerClassName,
}) =>
  <div className={cn(styles.hexContainer, className)}>
    <BlueHexagon />
    <WhiteHexagon />
    <div className={cn(styles.hexContainerText, textContainerClassName)}>
      {children}
    </div>
  </div>;

interface ISvgProps {
  extraDefs?: any;
  className?: string;
  style?: any;
  shadow?: boolean;
}

const Hexagon: React.SFC<ISvgProps> = ({ extraDefs, className, shadow, style, ...props }) =>
  <svg width="310" height="310" className={className}>
    {extraDefs}

    {shadow &&
      <filter id="dropshadow" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="1" dy="1" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2" />
        </feComponentTransfer>

        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>}

    <polygon
      points="303,153 228,283 78,283 3,153 78,23 228,23"
      style={{ [shadow && "filter"]: "url(#dropshadow)", ...style }}
      {...props}
    />
  </svg>;

const blueGradient = (
  <defs>
    <linearGradient
      id="linear-gradient"
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="0"
      y2="300"
    >
      <stop offset="14%" stopColor="#09719B" stopOpacity="0%" />
      <stop offset="43%" stopColor="#09719B" stopOpacity="0%" />
      <stop offset="100%" stopColor="#424A52" stopOpacity="0%" />
    </linearGradient>
  </defs>
);
export const BlueHexagon: React.SFC = () =>
  <Hexagon
    className={styles.hexagonBlue}
    extraDefs={blueGradient}
    style={{ fill: "url(#linear-gradient)" }}
    shadow
  />;

const whiteGradient = (
  <defs>
    <linearGradient
      id="linear-gradient2"
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="0"
      y2="300"
    >
      <stop offset="0%" stopColor="#F2F9EA" stopOpacity="0%" />
      <stop offset="1.63%" stopColor="#F2F9EA" stopOpacity="0%" />
      <stop offset="85.72%" stopColor="#F8F9F9" stopOpacity="0%" />
      <stop offset="100%" stopColor="#F8F9FA" stopOpacity="0%" />
    </linearGradient>
  </defs>
);
export const WhiteHexagon: React.SFC = () =>
  <Hexagon
    className={styles.hexagonWhite}
    extraDefs={whiteGradient}
    style={{ opacity: "0.98", fill: "url(#linear-gradient2)" }}
    shadow
  />;
