import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface BankProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const BankIcon: React.FC<BankProps> = ({
  width = 20,
  height = 23,
  strokeColor = '#417B81',
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 23"
      fill="none"
      {...props}
    >
      <Path
        d="M13 1.28418H7C3.69067 1.28418 3 1.99447 3 5.39786V21.8526H17V5.39786C17 1.99447 16.3093 1.28418 13 1.28418Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M1 21.8525H19"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 21.8521V18.7668C13 17.0651 12.6547 16.71 11 16.71H9C7.34533 16.71 7 17.0651 7 18.7668V21.8521"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M11.5 5.39746H8.5M11.5 8.99693H8.5M11.5 12.5964H8.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default BankIcon;

