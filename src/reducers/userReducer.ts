import {v4 as uuid} from 'uuid';
import {getRandomEmoji} from '../lib/emoji';
import {RootState} from './rootReducer';

export interface UserReducerState {
  user_id: string;
  user_emoji: string;
}

const userReducerInitialState: UserReducerState = {
  user_id: uuid(),
  user_emoji: getRandomEmoji(),
};

export const userReducer = (
  state: UserReducerState = userReducerInitialState,
  action: any,
): UserReducerState => {
  return state;
};

export const selectUserEmoji = (state: RootState) => {
  return state.user.user_emoji;
};
