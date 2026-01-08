import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface StarCircleProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
}

const StarCircleIcon: React.FC<StarCircleProps> = ({
  width = 35,
  height = 35,
  strokeColor = '#86A5A8',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 224 224"
      fill="none"
      {...props}
    >
      <Path
        d="M217 111.915C217 53.8788 169.953 6.83138 111.917 6.83138C53.8808 6.83138 6.83337 53.8788 6.83337 111.915C6.83337 169.951 53.8808 216.998 111.917 216.998C169.953 216.998 217 169.951 217 111.915Z"
        stroke={strokeColor}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M120.994 66.961L130.241 85.6064C131.502 88.202 134.864 90.6916 137.701 91.1683L154.46 93.9757C165.177 95.7767 167.699 103.616 159.976 111.35L146.947 124.486C144.741 126.711 143.532 131.002 144.215 134.074L147.945 150.336C150.887 163.208 144.11 168.187 132.815 161.46L117.107 152.084C114.27 150.389 109.594 150.389 106.705 152.084L90.9963 161.46C79.7537 168.187 72.924 163.155 75.866 150.336L79.5961 134.074C80.279 131.002 79.0707 126.711 76.8642 124.486L63.8353 111.35C56.1651 103.616 58.6343 95.7767 69.3516 93.9757L86.1105 91.1683C88.8949 90.6916 92.2572 88.202 93.5181 85.6064L102.764 66.961C107.808 56.8437 116.003 56.8437 120.994 66.961Z"
        stroke={strokeColor}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default StarCircleIcon;

