import * as cn from "classnames";
import * as React from "react";
import * as style from "./TextCopyable.scss";

interface ITextCopyableProps {
  clipText?: string;
  text: string;
  maxTextLength?: number;
  className?: string;
  copyIconOnRight?: boolean;
}

const shortenText = (text: string, length: number) => {
  const breakPoint = Math.floor(length / 2);
  const beginOfText = text.substring(0, breakPoint);
  const endOfText = text.substring(text.length - (length - breakPoint));
  return beginOfText + "\u2026" + endOfText;
};

export const TextCopyable: React.SFC<ITextCopyableProps> = ({
  clipText,
  text,
  maxTextLength,
  className,
  copyIconOnRight,
}) => {
  let display_text = text;
  if (maxTextLength !== undefined && display_text.length > maxTextLength) {
    display_text = shortenText(display_text, maxTextLength);
  }
  const cText = clipText ? clipText : text;

  return (
    <span className={cn(className, style.textStyle)}>
      {!copyIconOnRight &&
        <i
          className={cn("material-icons", style.iconStyle, "copy-to-clipboard")}
          data-clipboard-text={cText}
        >
          content_copy
        </i>}
      {display_text}
      {copyIconOnRight &&
        <i
          className={cn("material-icons", style.iconStyle, style.iconOnRight, "copy-to-clipboard")}
          data-clipboard-text={cText}
        >
          content_copy
        </i>}
    </span>
  );
};
