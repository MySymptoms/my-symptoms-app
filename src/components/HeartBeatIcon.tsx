import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const HeartBeatIcon: React.FC<SvgProps> = props => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      d="M1 7h7.092L9.87 3l2.26 8 2.89-4H21"
      stroke={props.stroke || '#84FF89'}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
