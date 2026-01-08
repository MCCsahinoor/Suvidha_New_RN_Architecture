import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface LanguageProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const LanguageIcon: React.FC<LanguageProps> = ({
  width = 20,
  height = 20,
  strokeColor = '#2D264B',
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M19 10C19 14.9706 14.9706 19 10 19M19 10C19 5.02944 14.9706 1 10 1M19 10H1M10 19C5.02944 19 1 14.9706 1 10M10 19C10 19 14 16 14 10C14 4 10 1 10 1M10 19C10 19 6 16 6 10C6 4 10 1 10 1M1 10C1 5.02944 5.02944 1 10 1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default LanguageIcon;

