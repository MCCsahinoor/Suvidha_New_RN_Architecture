import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface EnvelopeColorIconProps extends SvgProps {
  width?: number | string;
  height?: number | string;
  gradientStart?: string;
  gradientEnd?: string;
  gradientStart2?: string;
  gradientEnd2?: string;
  accentColor?: string;
  borderColor?: string;
}

const EnvelopeColorIcon: React.FC<EnvelopeColorIconProps> = ({
  width = 17,
  height = 11,
  gradientStart = '#FFC107',
  gradientEnd = '#FFD54F',
  gradientStart2 = '#FFE082',
  gradientEnd2 = '#FFCA28',
  accentColor = '#FFB300',
  borderColor = '#444444',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 17 11"
      fill="none"
      {...props}
    >
      <Path
        d="M15.9667 10.8337H1.03333C0.74 10.8337 0.5 10.5937 0.5 10.3003V0.700326C0.5 0.406992 0.74 0.166992 1.03333 0.166992H15.9667C16.26 0.166992 16.5 0.406992 16.5 0.700326V10.3003C16.5 10.5937 16.26 10.8337 15.9667 10.8337Z"
        fill="url(#paint0_linear_1512_1641)"
      />
      <Path
        d="M16.5 0.993659V0.700326C16.5 0.406992 16.26 0.166992 15.9667 0.166992H1.03333C0.74 0.166992 0.5 0.406992 0.5 0.700326V0.966992L8.48667 7.11366L16.5 0.993659Z"
        fill="url(#paint1_linear_1512_1641)"
      />
      <Path
        d="M5.84673 5.20578L0.766733 10.7524C0.646733 10.6858 0.5534 10.5658 0.526733 10.4191L5.56673 4.92578L5.84673 5.20578Z"
        fill={accentColor}
      />
      <Path
        d="M16.4733 10.4724C16.4333 10.6058 16.34 10.7124 16.2067 10.7791L11.14 5.19245L11.4333 4.92578L16.4733 10.4724Z"
        fill={accentColor}
      />
      <Path
        d="M16.5 0.832669V1.33934L8.48667 7.366L0.5 1.31267V0.819336L8.48667 6.87267L16.5 0.832669Z"
        fill={accentColor}
      />
      <Path
        opacity="0.2"
        d="M15.9667 0.566992C16.0467 0.566992 16.1 0.633659 16.1 0.700326V10.3003C16.1 10.3803 16.0467 10.4337 15.9667 10.4337H1.03333C0.953333 10.4337 0.9 10.3803 0.9 10.3003V0.700326C0.9 0.633659 0.953333 0.566992 1.03333 0.566992H15.9667ZM15.9667 0.166992H1.03333C0.74 0.166992 0.5 0.406992 0.5 0.700326V10.3003C0.5 10.5937 0.74 10.8337 1.03333 10.8337H15.9667C16.26 10.8337 16.5 10.5937 16.5 10.3003V0.700326C16.5 0.406992 16.26 0.166992 15.9667 0.166992Z"
        fill={borderColor}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1512_1641"
          x1="8.5"
          y1="1.87805"
          x2="8.5"
          y2="10.8777"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={gradientStart} />
          <Stop offset="1" stopColor={gradientEnd} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1512_1641"
          x1="8.5"
          y1="-1.90551"
          x2="8.5"
          y2="6.58753"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={gradientStart2} />
          <Stop offset="0.9931" stopColor={gradientEnd2} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default EnvelopeColorIcon;

