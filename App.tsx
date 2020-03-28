/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar, View} from 'react-native';
import {compose, createStore} from 'redux';
import rootReducer from './src/reducers/rootReducer';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {OverviewScreen} from './src/OverviewScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {FeverInputScreen} from './src/FeverInputScreen';
import {DryCoughInputScreen} from './src/DryCoughInputScreen';
import {SafeAreaProvider, useSafeArea} from 'react-native-safe-area-context';
import {SummaryPage} from './src/SummaryPage';
import {ReportList} from './src/ReportList';
import {ShortnessOfBreathInputScreen} from './src/ShortnessOfBreathInputScreen';
import {AchesAndPainInputScreen} from './src/AchesAndPainsInputScreen';
import {SoreThroatInputScreen} from './src/SoreThroatInputScreen';

// TS declaration for making redux devtools extension stop complaining in createStore below.
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const Stack = createStackNavigator();

export type RootStackParamList = {
  Overview: undefined;
  Fever: undefined;
  DryCough: undefined;
  ShortnessOfBreath: undefined;
  AchesAndPain: undefined;
  SoreThroat: undefined;
  ReportList: undefined;
  Summary: undefined;
};

const App = () => {
  const insets = useSafeArea();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
        backgroundColor: '#2E2E2E',
      }}>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name={'Overview'} component={OverviewScreen} />
            <Stack.Screen name={'Fever'} component={FeverInputScreen} />
            <Stack.Screen name={'DryCough'} component={DryCoughInputScreen} />
            <Stack.Screen
              name={'ShortnessOfBreath'}
              component={ShortnessOfBreathInputScreen}
            />
            <Stack.Screen
              name={'AchesAndPain'}
              component={AchesAndPainInputScreen}
            />
            <Stack.Screen
              name={'SoreThroat'}
              component={SoreThroatInputScreen}
            />
            <Stack.Screen name={'Summary'} component={SummaryPage} />
            <Stack.Screen name={'ReportList'} component={ReportList} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
};

export default () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);
