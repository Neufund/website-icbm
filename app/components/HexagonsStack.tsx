import * as cn from "classnames";
import * as React from "react";
import * as styles from "./HexagonsStack.scss";

export enum HexagonsStackStyle {
  BLUE_WHITE,
  WHITE_BLUE,
}

export interface IHexagonsStackProps {
  children: React.ReactNode;
  className?: string;
  textContainerClassName?: string;
  visualStyle?: HexagonsStackStyle;
  width?: number;
  height?: number;
  blueClassName?: string;
  whiteClassName?: string;
  hexContainerTextClassName?: string;
}

export const HexagonsStack: React.SFC<IHexagonsStackProps> = ({
  children,
  className,
  textContainerClassName,
  visualStyle = HexagonsStackStyle.WHITE_BLUE,
  width = 310,
  height = 310,
  blueClassName = styles.hexagonBlue,
  whiteClassName = styles.hexagonWhite,
  hexContainerTextClassName = styles.hexContainerText,
}) =>
  <div className={cn(styles.hexContainer, className)}>
    {visualStyle === HexagonsStackStyle.WHITE_BLUE &&
      <div>
        <BlueHexagon
          className={blueClassName}
          polygonPoints={"480,300 300,480 70,410 0,170 170,0 410,70"}
          width={width}
          height={height}
        />
        <WhiteHexagon
          className={whiteClassName}
          polygonPoints={"480,300 300,480 70,410 0,170 170,0 410,70"}
          width={width}
          height={height}
        />
      </div>}
    {visualStyle === HexagonsStackStyle.BLUE_WHITE &&
      <div>
        <WhiteHexagon
          className={whiteClassName}
          polygonPoints={"480,300 300,480 70,410 0,170 170,0 410,70"}
          width={width}
          height={height}
        />
        <BlueHexagon
          className={blueClassName}
          polygonPoints={"480,300 300,480 70,410 0,170 170,0 410,70"}
          width={width}
          height={height}
        />
      </div>}
    <div className={cn(hexContainerTextClassName, textContainerClassName)}>
      {children}
    </div>
  </div>;

interface ISvgProps {
  extraDefs?: any;
  className?: string;
  style?: any;
  polygonPoints?: string;
  shadow?: boolean;
  width?: number;
  height?: number;
}

interface IHexagonProps {
  polygonPoints?: string;
  width?: number;
  height?: number;
  className: string;
}

const Hexagon: React.SFC<ISvgProps> = ({
  extraDefs,
  className,
  shadow,
  polygonPoints,
  width,
  style,
  ...props,
}) =>
  <svg width={width} height={width} className={className}>
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
      points={polygonPoints}
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
export const BlueHexagon: React.SFC<IHexagonProps> = ({
  polygonPoints,
  width,
  height,
  className,
}) =>
  <Hexagon
    className={className}
    extraDefs={blueGradient}
    polygonPoints={polygonPoints}
    width={width}
    height={height}
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
export const WhiteHexagon: React.SFC<IHexagonProps> = ({
  polygonPoints,
  width,
  height,
  className,
}) =>
  <Hexagon
    className={className}
    extraDefs={whiteGradient}
    polygonPoints={polygonPoints}
    width={width}
    height={height}
    style={{ opacity: "0.98", fill: "url(#linear-gradient2)" }}
    shadow
  />;
