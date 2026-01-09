import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface ClockProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const ClockIcon: React.FC<ClockProps> = ({
  width = 20,
  height = 20,
  strokeColor = '#222B45',
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
      <Circle
        cx="10.0003"
        cy="9.99984"
        r="8.33333"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M7.91699 7.9165L10.8336 10.8329M13.3337 6.6665L9.16699 10.8332"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ClockIcon;

