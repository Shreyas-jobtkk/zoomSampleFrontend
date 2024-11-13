import React from "react";
import { Box } from "@mui/material";

interface TextWithBorderProps {
  text: string;
  borderColor?: string;
  borderWidth?: string;
  padding?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
}

const TextWithBorder: React.FC<TextWithBorderProps> = ({
  text,
  borderColor = "black",
  borderWidth = "1px",
  padding = "10px 5px",
  borderRadius,
  width = "150px",
  height,
}) => {
  const style = {
    border: `${borderWidth} solid ${borderColor}`,
    padding: padding,
    borderRadius: borderRadius,
    width: width,
    height: height,
    // display: 'inline-block',
    backgroundColor: "#b3cee5",
  };

  return <Box style={style}>{text}</Box>;
};

export default TextWithBorder;
