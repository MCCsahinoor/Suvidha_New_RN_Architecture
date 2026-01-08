import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface UserThreeProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const UserThreeIcon: React.FC<UserThreeProps> = ({
  width = 13,
  height = 13,
  strokeColor = 'white',
  strokeWidth = 1,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      {...props}
    >
      <Path
        d="M10.1667 10.5995C10.1667 9.60967 9.45062 8.33331 8.33333 8.33333H4.66667C3.54938 8.33331 2.83333 9.60967 2.83333 10.5995M1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5ZM8.33333 4.66667C8.33333 5.67919 7.51252 6.5 6.5 6.5C5.48748 6.5 4.66667 5.67919 4.66667 4.66667C4.66667 3.65414 5.48748 2.83333 6.5 2.83333C7.51252 2.83333 8.33333 3.65414 8.33333 4.66667Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default UserThreeIcon;

