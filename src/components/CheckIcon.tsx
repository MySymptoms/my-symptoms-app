import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CheckIcon: React.FC<SvgProps> = props => (
  <Svg width={30} height={30} viewBox="0 0 30 23" fill="none" {...props}>
    <Path
      d="M2.593 13.037l7.259 7.26 17.63-17.63"
      stroke="#fff"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
