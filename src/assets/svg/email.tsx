import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface EmailProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number | string;
}

const EmailIcon: React.FC<EmailProps> = ({
  width = 20,
  height = 18,
  strokeColor = '#2D264B',
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 18"
      fill="none"
      {...props}
    >
      <Path
        d="M0.833313 3.5L7.17025 7.09056C9.50644 8.41426 10.4935 8.41426 12.8297 7.09056L19.1666 3.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M0.847765 10.3528C0.907692 13.1629 0.937656 14.5679 1.97452 15.6087C3.01139 16.6495 4.45445 16.6858 7.34057 16.7583C9.11935 16.803 10.8806 16.803 12.6594 16.7583C15.5455 16.6858 16.9886 16.6495 18.0254 15.6087C19.0623 14.5679 19.0923 13.1629 19.1522 10.3528C19.1715 9.44927 19.1715 8.55107 19.1522 7.64752C19.0923 4.83745 19.0623 3.43242 18.0254 2.3916C16.9886 1.35079 15.5455 1.31453 12.6594 1.24202C10.8806 1.19732 9.11935 1.19732 7.34057 1.24201C4.45445 1.31452 3.01139 1.35078 1.97452 2.39159C0.937651 3.4324 0.907688 4.83744 0.847764 7.64751C0.828496 8.55106 0.828496 9.44927 0.847765 10.3528Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EmailIcon;

