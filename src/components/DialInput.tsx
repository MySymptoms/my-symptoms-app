import React, {useState, useCallback, useRef} from 'react';
import {interpolateNumber} from 'd3-interpolate';
import {Dimensions, Text, StyleSheet, View, TextInput} from 'react-native';
import Animated, {
  add,
  block,
  call,
  cond,
  debug,
  eq,
  event,
  greaterThan,
  interpolate,
  modulo,
  multiply,
  set,
  sub,
  Value,
} from 'react-native-reanimated';
import {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Svg,
  Use,
} from 'react-native-svg';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {atan2} from '../lib/math';
import {fontName} from '../lib/vars';

const {width} = Dimensions.get('window');
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  initialValue?: number;
  range?: {
    start: number;
    end: number;
  };
  size?: number;
  radius?: number;
  onRelease?: (value: number) => void;
  dialStrokeWidth?: number;
}

const toRadScale = interpolateNumber(0, 2 * Math.PI);
export default ({
  initialValue = 0,
  range: {start, end} = {start: 0, end: 1},
  size = width - 32,
  radius = (size - 50) / 2,
  onRelease = () => {},
  dialStrokeWidth = 50,
}: Props) => {
  const initialRotationRad = toRadScale((initialValue - start) / (end - start));

  const x = new Value(0);
  const y = new Value(0);
  const translationX = new Value(radius);
  const translationY = new Value(-radius / 2);
  const translateX = translationX;
  const translateY = translationY;
  const rotate = new Value(initialRotationRad);
  const rotateEnd = new Value(initialRotationRad);
  const rotateBegin = new Value(0);
  const angle = new Value(0);
  const prevAngle = new Value(0);

  const state = new Value(State.UNDETERMINED);

  const text = useRef<Text>();

  const callback = useCallback(
    ([angle]) =>
      requestAnimationFrame(() => {
        if (text.current) {
          text.current.setNativeProps({text: angle.toFixed(1)});
        }
        // setTextValue(angle);
      }),
    [],
  );

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX,
        translationY,
        state,
        x,
        y,
      },
    },
  ]);

  return (
    <Container {...{size}}>
      <TextInput
        value={initialValue?.toFixed(1) ?? '0.0'}
        style={{
          position: 'absolute',
          color: 'white',
          fontFamily: fontName,
          fontWeight: '500',
          fontSize: 48,
          lineHeight: 61,
        }}
        ref={text}
      />
      <Svg width={size} height={size} style={{position: 'absolute'}}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor="#eda338" />
            <Stop offset="1" stopColor="#f5d346" />
          </LinearGradient>
        </Defs>
        <AnimatedCircle
          stroke="url(#grad)"
          r={radius}
          cy={size / 2}
          cx={size / 2}
          {...{strokeWidth}}
        />
      </Svg>
      <Animated.Code>
        {() => {
          console.log('animated code');

          return block([
            set(prevAngle, angle),
            set(
              angle,
              modulo(
                multiply(
                  atan2(
                    multiply(sub(translateY, sub(radius, y)), -1),
                    sub(translateX, sub(radius, x)),
                  ),
                  -1,
                ),
                2 * Math.PI,
              ),
            ),
            cond(
              eq(state, State.BEGAN),
              set(rotateBegin, debug('start', angle)),
            ),
            cond(
              eq(state, State.ACTIVE),
              block([
                call(
                  [
                    interpolate(
                      modulo(
                        add(rotateEnd, sub(debug('angle', angle), rotateBegin)),
                        2 * Math.PI,
                      ),
                      {
                        inputRange: [0, 2 * Math.PI],
                        outputRange: [start, end],
                      },
                    ),
                  ],
                  callback,
                ),
                set(rotate, add(rotateEnd, sub(angle, rotateBegin))),
              ]),
            ),
            cond(
              eq(state, State.END),
              block([
                set(
                  rotateEnd,
                  debug('end', add(rotateEnd, sub(angle, rotateBegin))),
                ),
                call(
                  [
                    interpolate(
                      modulo(
                        add(rotateEnd, sub(debug('angle', angle), rotateBegin)),
                        2 * Math.PI,
                      ),
                      {
                        inputRange: [0, 2 * Math.PI],
                        outputRange: [start, end],
                      },
                    ),
                  ],
                  ([v]) => onRelease(v),
                ),
              ]),
            ),
          ]);
        }}
      </Animated.Code>
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{onGestureEvent}}>
        <Animated.View>
          <Animated.View
            style={{
              transform: [{rotate}],
            }}>
            <Svg style={StyleSheet.absoluteFillObject}>
              <AnimatedCircle fill="white" cy={size / 2} cx={size / 2} r={10} />
              <Path
                fill={'white'}
                stroke={'red'}
                d={`M${size / 2} ${size / 2} L${size} ${size / 2}`}
              />
            </Svg>
            <Svg width={size} height={size} viewBox="-100 -100 190 190">
              <Defs>
                <Circle cx={0} cy={87} r={2.2} id="prefix__b" fill="white" />
                <Path
                  id="prefix__a"
                  stroke="white"
                  strokeWidth={3.8}
                  d="M0 95V78"
                />
              </Defs>
              <G id="prefix__c" transform="translate(-5 -5)">
                <Use xlinkHref="#prefix__a" width="100%" height="100%" />
                <Use
                  xlinkHref="#prefix__b"
                  transform="rotate(6)"
                  width="100%"
                  height="100%"
                />
                <Use
                  xlinkHref="#prefix__b"
                  transform="rotate(12)"
                  width="100%"
                  height="100%"
                />
                <Use
                  xlinkHref="#prefix__b"
                  transform="rotate(18)"
                  width="100%"
                  height="100%"
                />
                <Use
                  xlinkHref="#prefix__b"
                  transform="rotate(24)"
                  width="100%"
                  height="100%"
                />
              </G>
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(30 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(60 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(90 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(120 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(150 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(180 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(-150 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(-120 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(-90 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(-60 -5 -5)"
                width="100%"
                height="100%"
              />
              <Use
                xlinkHref="#prefix__c"
                transform="rotate(-30 -5 -5)"
                width="100%"
                height="100%"
              />
            </Svg>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

import styled from 'styled-components/native';

interface ContainerProps {
  size: number;
}

const Container = styled.View<ContainerProps>`
  height: ${p => p.size}px;
  width: ${p => p.size}px;
  align-items: center;
  justify-content: center;
`;
