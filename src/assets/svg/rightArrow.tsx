import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface RightArrowProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const RightArrowIcon: React.FC<RightArrowProps> = ({
  width = 14,
  height = 9,
  strokeColor = 'black',
  strokeWidth = 2,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 9"
      fill="none"
      {...props}
    >
      <Path
        d="M1 1L7 7L13 1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default RightArrowIcon;

