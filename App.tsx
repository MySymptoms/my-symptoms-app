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
import {SafeAreaView, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {compose, createStore} from 'redux';
import rootReducer from './src/reducers/rootReducer';
import {Provider} from 'react-redux';
import {HealthForm} from './src/HealthForm';
import {HealthReportComponent} from './src/HealthReportComponent';
import {NavigationContainer} from '@react-navigation/native';
import {StartScreen} from './src/StartScreen';
import { OverviewScreen } from "./src/OverviewScreen";

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

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#2E2E2E'}}>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeBackgroundColor: 'white',
              inactiveBackgroundColor: 'white',
              inactiveTintColor: 'grey',
              labelPosition: 'below-icon',
            }}>
            <Tab.Screen
              name="Overview"
              component={OverviewScreen}
              options={{
                tabBarLabel: 'Form',
                // tabBarIcon: ({color, focused, size}) => (
                //   <ControllerIcon fill={color} size={size} />
                // ),
              }}
            />
            <Tab.Screen
              name="Form"
              component={HealthForm}
              options={{
                tabBarLabel: 'Form',
                // tabBarIcon: ({color, focused, size}) => (
                //   <ControllerIcon fill={color} size={size} />
                // ),
              }}
            />
            <Tab.Screen
              name="Reportp"
              component={HealthReportComponent}
              options={{
                tabBarLabel: 'Reports',
                // tabBarIcon: ({color, focused, size}) => (
                //   <ControllerIcon fill={color} size={size} />
                // ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
