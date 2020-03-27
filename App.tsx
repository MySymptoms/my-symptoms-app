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
import {compose, createStore} from 'redux';
import rootReducer from './src/reducers/rootReducer';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {OverviewScreen} from './src/OverviewScreen';
import {createStackNavigator} from '@react-navigation/stack';

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

export const Routes = {
  Overview: 'Overview',
};

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#2E2E2E'}}>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name={Routes.Overview} component={OverviewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
