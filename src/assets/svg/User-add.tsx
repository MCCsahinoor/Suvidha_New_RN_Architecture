import React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface UserAddProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const UserAddIcon: React.FC<UserAddProps> = ({
  width = 30,
  height = 30,
  strokeColor = '#456568',
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <Path
        d="M22.8088 9.59353V4.83887"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.4329 7.21729H25.1875"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.8023 20.3979C19.8023 18.298 17.7681 16.1577 15.1108 16.1577C12.4534 16.1577 10.1978 18.298 10.1978 20.406"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Ellipse
        cx="14.9999"
        cy="11.7433"
        rx="2.14958"
        ry="2.14958"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d="M17.3754 4.33249C16.6075 4.16149 15.809 4.07129 14.9895 4.07129C8.95376 4.07129 4.06079 8.96426 4.06079 15C4.06079 21.0358 8.95376 25.9288 14.9895 25.9288C21.0253 25.9288 25.9183 21.0358 25.9183 15C25.9183 13.9167 25.7607 12.8702 25.4671 11.8822"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default UserAddIcon;

