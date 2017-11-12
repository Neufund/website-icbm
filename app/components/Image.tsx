import * as React from "react";

interface IImageProps {
  partialPath: string;
  className?: string;
  altText?: string;
}

export const Image: React.SFC<IImageProps> = ({ partialPath, className, altText }) => {
  try {
    // @note: thanks to wonders of static analysis + webpack all images matching these paths will be part of the bundle
    const image = require("!file-loader?publicPath=/!../assets/img/" + partialPath + ".png");
    return <img src={image} className={className} alt={altText} />;
  } catch (e) {
    // we show error here. Otherwise react goes into loop
    // tslint:disable-next-line
    console.error(`Couldnt find image at path ${partialPath}`);
    return <div />;
  }
};
