import React, {FC} from 'react';
import {Image, ImageSourcePropType, ImageStyle} from 'react-native';
import {StyleSheet} from 'react-native';

import Baby from '../../assets/baby.png';
import BackArrow from '../../assets/back_arrow.png';
import BandAid from '../../assets/band_aid.png';
import Bed from '../../assets/bed.png';
import Corona from '../../assets/corona.png';
import FaceWithThermometer from '../../assets/face_with_thermometer.png';
import Flex from '../../assets/flex.png';
import Food from '../../assets/food.png';
import HeartYellow from '../../assets/heart_yellow.png';
import Hospital from '../../assets/hospital.png';
import Map from '../../assets/map.png';
import Mask from '../../assets/mask.png';
import Nauseated from '../../assets/nauseated.png';
import Nose from '../../assets/nose.png';
import PaperSheet from '../../assets/paper_sheet.png';
import Pill from '../../assets/pill.png';
import PlaneLanding from '../../assets/plane_landing.png';
import Smile from '../../assets/smile.png';
import Sneezing from '../../assets/sneezing.png';
import Star from '../../assets/star.png';
import Sweat from '../../assets/sweat.png';
import ThumbDown from '../../assets/thumb_down.png';
import Toilet from '../../assets/toilet.png';
import Weary from '../../assets/weary.png';
import Yawn from '../../assets/yawn.png';

export const Icons = {
  Baby,
  BackArrow,
  BandAid,
  Bed,
  Corona,
  FaceWithThermometer,
  Flex,
  Food,
  HeartYellow,
  Hospital,
  Map,
  Mask,
  Nauseated,
  Nose,
  PaperSheet,
  Pill,
  PlaneLanding,
  Smile,
  Sneezing,
  Star,
  Sweat,
  ThumbDown,
  Toilet,
  Weary,
  Yawn,
};

interface IconProps {
  source: ImageSourcePropType;
  style?: ImageStyle;
}

export const Icon: FC<IconProps> = ({source, style}) => {
  return <Image style={[styles.iconStyle, style]} source={source} />;
};

const styles = StyleSheet.create({
  iconStyle: {width: 30, height: 30},
});
