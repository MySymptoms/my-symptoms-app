import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const BackIcon: React.FC<SvgProps> = props => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.707.293a1 1 0 010 1.414L3.414 9H20a1 1 0 110 2H3.414l7.293 7.293a1 1 0 01-1.414 1.414l-9-9a1 1 0 010-1.414l9-9a1 1 0 011.414 0z"
      fill="#C1C1C1"
    />
  </Svg>
);
