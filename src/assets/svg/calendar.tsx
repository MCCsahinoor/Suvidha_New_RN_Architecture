import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface CalendarProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const Calendar: React.FC<CalendarProps> = ({
  width = 18,
  height = 18,
  strokeColor = '#7F7F81',
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M13.5 1.43176V2.86358M4.5 1.43176V2.86358"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.99664 9.30676H9.00336M8.99664 12.1704H9.00336M11.9933 9.30676H12M6 9.30676H6.00673M6 12.1704H6.00673"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.625 5.72717H15.375"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.875 8.76503C1.875 5.64559 1.875 4.08587 2.81409 3.11679C3.75318 2.14771 5.26462 2.14771 8.2875 2.14771H9.7125C12.7354 2.14771 14.2468 2.14771 15.1859 3.11679C16.125 4.08587 16.125 5.64559 16.125 8.76503V9.13266C16.125 12.2521 16.125 13.8118 15.1859 14.7809C14.2468 15.75 12.7354 15.75 9.7125 15.75H8.2875C5.26462 15.75 3.75318 15.75 2.81409 14.7809C1.875 13.8118 1.875 12.2521 1.875 9.13266V8.76503Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.25 5.72717H15.75"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Calendar;

