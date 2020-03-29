import { v4 as uuid } from 'uuid';
import { getRandomEmoji } from '../lib/emoji';
import { RootState } from './rootReducer';
import { REHYDRATE } from 'redux-persist/es/constants';
import { RehydrateAction } from 'redux-persist/es/types';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface UserReducerState {
  user_id: string;
  user_emoji: string;
  temperatureUnit: TemperatureUnit;
}

const userReducerInitialState: UserReducerState = {
  user_id: uuid(),
  user_emoji: getRandomEmoji(),
  temperatureUnit: 'celsius',
};

type RehydrateActionWithGeneric<S> = Omit<RehydrateAction, 'payload'> & {
  payload?: S;
};

export const userReducer = (
  state: UserReducerState = userReducerInitialState,
  action:
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
