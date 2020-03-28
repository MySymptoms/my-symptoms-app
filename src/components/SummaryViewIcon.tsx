import * as React from 'react';
import Svg, {Rect, SvgProps} from 'react-native-svg';

export const SummaryViewIcon: React.FC<SvgProps> = props => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Rect width={10} height={10} rx={1} fill="#C4C4C4" />
    <Rect x={12} width={10} height={10} rx={1} fill="#FF7A7A" />
    <Rect y={12} width={22} height={10} rx={1} fill="#FFBC5C" />
  </Svg>
);
