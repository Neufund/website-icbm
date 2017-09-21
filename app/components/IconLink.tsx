import * as React from "react";
import * as style from "./IconLink.scss";

interface IIconLink {
  url: string;
  text?: string;
  className?: string;
}

export const IconLink: React.SFC<IIconLink> = ({ url, text, className }) =>
  <a className={className !== undefined ? `${style.link} ${className}` : style.link} href={url}>
    <i className={`material-icons ${style.iconStyle}`}>link</i>
    {text !== undefined ? text : url}
  </a>;
