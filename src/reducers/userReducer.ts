import {v4 as uuid} from 'uuid';
import {getRandomEmoji} from '../lib/emoji';
import {RootState} from './rootReducer';
import {REHYDRATE} from 'redux-persist/es/constants';
import {RehydrateAction} from 'redux-persist/es/types';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface UserReducerState {
  user_id: string;
  user_emoji: string;
  temperatureUnit: TemperatureUnit;
  shareData: boolean;
  birthYear: number | null;
  recentTravels: boolean | null;
  preExistingAilments: string | null;
}

const userReducerInitialState: UserReducerState = {
  user_id: uuid(),
  user_emoji: getRandomEmoji(),
  temperatureUnit: 'celsius',
  shareData: false,
  birthYear: null,
  recentTravels: null,
  preExistingAilments: null,
};

type RehydrateActionWithGeneric<S> = Omit<RehydrateAction, 'payload'> & {
  payload?: S;
};

export const userReducer = (
  state: UserReducerState = userReducerInitialState,
  action:
    | SetShareDataAction
    | SetBirthYear
    | SetHasTravelledRecently
    | SetPreExistingAilments
    | SetTemperatureUnitAction
    | RehydrateActionWithGeneric<RootState>,
): UserReducerState => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.user,
        temperatureUnit: action.payload?.user.temperatureUnit ?? 'celsius',
      };
    }
    case 'user/temperature-unit': {
      return {
        ...state,
        temperatureUnit: action.temperatureUnit,
      };
    }
    case 'user/share-data': {
      return {
        ...state,
        shareData: action.shareData,
      };
    }
    case 'user/birth-year': {
      return {
        ...state,
        birthYear: action.birthYear,
      };
    }
    case 'user/has-travelled-recently': {
      return {
        ...state,
        recentTravels: action.recentTravels,
      };
    }
    case 'user/pre-existing-ailments': {
      return {
        ...state,
        preExistingAilments: action.preExistingAilments,
      };
    }
    default:
      return state;
  }
};

export const selectUserEmoji = (state: RootState) => {
  return state.user.user_emoji;
};

export const selectTemperatureUnit = (state: RootState): TemperatureUnit => {
  return state.user.temperatureUnit;
};

export const selectShareData = (state: RootState): boolean => {
  return state.user.shareData;
};

export const selectBirthYear = (state: RootState): number | null => {
  return state.user.birthYear;
};

export const selectRecentTravels = (state: RootState): boolean | null => {
  return state.user.recentTravels;
};

export const selectPreExistingAilment = (state: RootState): string | null => {
  return state.user.preExistingAilments;
};

interface SetTemperatureUnitAction {
  type: 'user/temperature-unit';
  temperatureUnit: TemperatureUnit;
}

export const setTemperatureUnit = (
  temperatureUnit: TemperatureUnit,
): SetTemperatureUnitAction => ({
  temperatureUnit,
  type: 'user/temperature-unit',
});

interface SetShareDataAction {
  type: 'user/share-data';
  shareData: boolean;
}

export const setShareData = (shareData: boolean): SetShareDataAction => ({
  type: 'user/share-data',
  shareData,
});

interface SetBirthYear {
  type: 'user/birth-year';
  birthYear: number;
}

export const setBirthYear = (birthYear: number): SetBirthYear => ({
  type: 'user/birth-year',
  birthYear,
});

interface SetHasTravelledRecently {
  type: 'user/has-travelled-recently';
  recentTravels: boolean | null;
}

export const setHasTravelledRecently = (
  recentTravels: boolean | null,
): SetHasTravelledRecently => ({
  type: 'user/has-travelled-recently',
  recentTravels,
});

interface SetPreExistingAilments {
  type: 'user/pre-existing-ailments';
  preExistingAilments: string | null;
}

export const setPreExistingAilments = (
  preExistingAilments: string | null,
): SetPreExistingAilments => ({
  type: 'user/pre-existing-ailments',
  preExistingAilments,
});
