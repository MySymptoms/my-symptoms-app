import {v4 as uuid} from 'uuid';
import {getRandomEmoji} from '../lib/emoji';

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
