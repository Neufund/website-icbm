import * as React from "react";

interface SvgProps {
    extraDefs?: any;
    className?: string;
    style?: any;
}

export const Hexagon: React.SFC<SvgProps> = ({ extraDefs, className, ...props }) =>
  <svg width="310" height="310" className={className}>
    {extraDefs}

    <filter id="dropshadow" height="130%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="2" dy="2" result="offsetblur"/>
      <feMerge> 
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <polygon points="303,153 228,283 78,283 3,153 78,23 228,23" {...props} />
  </svg>;
