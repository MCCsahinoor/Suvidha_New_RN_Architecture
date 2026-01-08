import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface GroupProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const GroupIcon: React.FC<GroupProps> = ({
  width = 20,
  height = 16,
  strokeColor = '#2D264B',
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 16"
      fill="none"
      {...props}
    >
      <Path
        d="M15.7273 10.3333C17.5347 10.3333 19 11.7262 19 13.4444V15H17.3636M13.2727 7.1242C14.6843 6.77883 15.7273 5.56076 15.7273 4.1111C15.7273 2.66145 14.6843 1.44337 13.2727 1.09801M10.8182 4.11111C10.8182 5.82933 9.35293 7.22222 7.54545 7.22222C5.73798 7.22222 4.27273 5.82933 4.27273 4.11111C4.27273 2.39289 5.73798 1 7.54545 1C9.35293 1 10.8182 2.39289 10.8182 4.11111ZM4.27273 10.3333H10.8182C12.6257 10.3333 14.0909 11.7262 14.0909 13.4444V15H1V13.4444C1 11.7262 2.46525 10.3333 4.27273 10.3333Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default GroupIcon;

