import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface PinProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const PinIcon: React.FC<PinProps> = ({
  width = 19,
  height = 19,
  strokeColor = '#417B81',
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      {...props}
    >
      <Path
        d="M18 8.96959L9.96279 16.5497C8.97817 17.4783 7.64274 18 6.25028 18C4.85782 18 3.52239 17.4783 2.53777 16.5497C1.55315 15.6211 1 14.3616 1 13.0483C1 11.7351 1.55315 10.4756 2.53777 9.54697L10.575 1.96687C11.2314 1.34779 12.1217 1 13.05 1C13.9783 1 14.8686 1.34779 15.525 1.96687C16.1814 2.58595 16.5502 3.4256 16.5502 4.30111C16.5502 5.17662 16.1814 6.01628 15.525 6.63535L7.47904 14.2154C7.15083 14.525 6.70569 14.6989 6.24154 14.6989C5.77738 14.6989 5.33224 14.525 5.00403 14.2154C4.67583 13.9059 4.49144 13.4861 4.49144 13.0483C4.49144 12.6106 4.67583 12.1907 5.00403 11.8812L12.429 4.88674"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PinIcon;

