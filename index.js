/**
 * @format
 */

import './before';
import {AppRegistry, YellowBox} from 'react-native';
import 'react-native-get-random-values';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings([
  'FlatList: Calling `getNode()` on the ref of an Animated component is no longer necessary.',
  'd: Calling `getNode()` on the ref of an Animated component is no longer necessary.',
]);

// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

AppRegistry.registerComponent(appName, () => App);
