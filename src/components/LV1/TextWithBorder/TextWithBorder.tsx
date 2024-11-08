import React from 'react';

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
  borderColor = 'black',
  borderWidth = '1px',
  padding = '10px 5px',
  borderRadius,
  width = '150px',
  height,
}) => {
  const style = {
    border: `${borderWidth} solid ${borderColor}`,
    padding: padding,
    borderRadius: borderRadius,
    width: width,
    height: height,
    // display: 'inline-block',
    backgroundColor: "#b3cee5"
  };

  return <div style={style}>{text}</div>;
};

export default TextWithBorder;
