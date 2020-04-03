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
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer, {RootState} from './src/reducers/rootReducer';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {OverviewScreen} from './src/OverviewScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {FeverInputScreen} from './src/SymptomInputScreens/FeverInputScreen';
import {DryCoughInputScreen} from './src/SymptomInputScreens/DryCoughInputScreen';
import {SafeAreaProvider, useSafeArea} from 'react-native-safe-area-context';
import {SummaryPage} from './src/SummaryPage';
import {ReportList} from './src/ReportList';
import {ShortnessOfBreathInputScreen} from './src/SymptomInputScreens/ShortnessOfBreathInputScreen';
import {AchesAndPainInputScreen} from './src/SymptomInputScreens/AchesAndPainsInputScreen';
import {SoreThroatInputScreen} from './src/SymptomInputScreens/SoreThroatInputScreen';
import {DetailedReportScreen} from './src/DetailedReportScreen';
import {DiarrhoeaInputScreen} from './src/SymptomInputScreens/DiarrhoeaInputScreen';
import {NauseaInputScreen} from './src/SymptomInputScreens/NauseaInputScreen';
import {RunnyNoseInputScreen} from './src/SymptomInputScreens/RunnyNoseInputScreen';
import {SenseOfTasteInputScreen} from './src/SymptomInputScreens/SenseOfTasteInputScreen';
import {SenseOfSmellInputScreen} from './src/SymptomInputScreens/SenseOfSmellInputScreen';
import {TirednessInputScreen} from './src/SymptomInputScreens/TirednessInputScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import {AdditionalDataInputScreen} from './src/AdditionalDataInputScreen';
import {DiagnosisInputScreen} from './src/DiagnosisInputScreen';
import {OnboardingScreen} from './src/OnboardingScreen';
import {selectBirthYear} from './src/reducers/userReducer';

// TS declaration for making redux devtools extension stop complaining in createStore below.
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const persistConfig: PersistConfig<any> = {
  key: 'my-symptoms',
  storage: AsyncStorage,
};

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  composeEnhancers(applyMiddleware(thunk)),
);

const persistor = persistStore(store);
const Stack = createStackNavigator();

export type RootStackParamList = {
  Onboarding: undefined;
  Overview: undefined;
  Fever: {currentReportDate: string};
  DryCough: {currentReportDate: string};
  Tiredness: {currentReportDate: string};
  ShortnessOfBreath: {currentReportDate: string};
  AchesAndPain: {currentReportDate: string};
  SoreThroat: {currentReportDate: string};
  Diarrhoea: {currentReportDate: string};
  Nausea: {currentReportDate: string};
  RunnyNose: {currentReportDate: string};
  SenseOfTaste: {currentReportDate: string};
  SenseOfSmell: {currentReportDate: string};
  ReportList: undefined;
  Summary: undefined;
  DetailedReport: undefined;
  AdditionalData: undefined;
  Diagnosis: undefined;
};

const App = () => {
  const insets = useSafeArea();
  const state: RootState = store.getState();
  const birthYear = selectBirthYear(state);

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
          <Stack.Navigator
            headerMode="none"
            initialRouteName={birthYear === null ? 'Onboarding' : 'Overview'}>
            <Stack.Screen name={'Onboarding'} component={OnboardingScreen} />
            <Stack.Screen name={'Overview'} component={OverviewScreen} />
            <Stack.Screen name={'Fever'} component={FeverInputScreen} />
            <Stack.Screen name={'DryCough'} component={DryCoughInputScreen} />
            <Stack.Screen name={'Tiredness'} component={TirednessInputScreen} />
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
            <Stack.Screen name={'Diarrhoea'} component={DiarrhoeaInputScreen} />
            <Stack.Screen name={'Nausea'} component={NauseaInputScreen} />
            <Stack.Screen name={'RunnyNose'} component={RunnyNoseInputScreen} />
            <Stack.Screen
              name={'SenseOfTaste'}
              component={SenseOfTasteInputScreen}
            />
            <Stack.Screen
              name={'SenseOfSmell'}
              component={SenseOfSmellInputScreen}
            />
            <Stack.Screen name={'Summary'} component={SummaryPage} />
            <Stack.Screen name={'ReportList'} component={ReportList} />
            <Stack.Screen
              name={'DetailedReport'}
              component={DetailedReportScreen}
            />
            <Stack.Screen
              name={'AdditionalData'}
              component={AdditionalDataInputScreen}
            />
            <Stack.Screen name={'Diagnosis'} component={DiagnosisInputScreen} />
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
