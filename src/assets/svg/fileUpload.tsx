import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface FileUploadProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number | string;
}

const FileUploadIcon: React.FC<FileUploadProps> = ({
  width = 34,
  height = 34,
  strokeColor = '#456568',
  fillColor = 'white',
  strokeWidth = 0.8,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 34 34"
      fill="none"
      {...props}
    >
      <Rect
        x="0.6"
        y="0.6"
        width="32.8"
        height="32.8"
        rx="16.4"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M13.25 16.083V15.3747C13.25 13.4187 14.9289 11.833 17 11.833C19.0711 11.833 20.75 13.4187 20.75 15.3747V16.083C22.4069 16.083 23.75 17.3515 23.75 18.9163C23.75 19.9651 23.1467 20.9056 22.25 21.3955M13.25 16.083C11.5931 16.083 10.25 17.3515 10.25 18.9163C10.25 19.9651 10.8533 20.9056 11.75 21.3955M13.25 16.083C13.5746 16.083 13.8872 16.1317 14.18 16.2218M17 17.4997V23.8747M17 17.4997L19.25 19.6247M17 17.4997L14.75 19.6247"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default FileUploadIcon;

