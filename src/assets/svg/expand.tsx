import React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface ExpandProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const ExpandIcon: React.FC<ExpandProps> = ({
  width = 20,
  height = 19,
  strokeColor = '#374957',
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 19"
      fill="none"
      {...props}
    >
      <Ellipse
        cx="9.93011"
        cy="9.41302"
        rx="8.70647"
        ry="8.38275"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M6.39241 12.8191C5.942 12.3855 6.01687 10.5431 6.01687 10.5431M6.39241 12.8191C6.84281 13.2528 8.75622 13.1806 8.75622 13.1806M6.39241 12.8191L9.05947 10.2511M13.4679 6.00662C13.0175 5.57296 11.1041 5.64513 11.1041 5.64513M13.4679 6.00662C13.9184 6.44029 13.8434 8.28257 13.8434 8.28257M13.4679 6.00662L10.8008 8.57459"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ExpandIcon;

