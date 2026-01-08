import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface NoteProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const NoteIcon: React.FC<NoteProps> = ({
  width = 10,
  height = 12,
  strokeColor = 'white',
  strokeWidth = 1,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 10 12"
      fill="none"
      {...props}
    >
      <Path
        d="M6.74985 6L4.29983 8.45002L3.24987 7.40001M3.24984 1.625H0.916504V11.25H9.08317V1.625H6.74984M3.24984 1.625V2.5H6.74984V1.625M3.24984 1.625V0.75H6.74984V1.625"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default NoteIcon;

