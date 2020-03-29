import {RootState} from './rootReducer';

export interface LocationReducerState {
  lat: number;
  long: number;
}

const locationReducerInitialState: LocationReducerState = {
  lat: 0,
  long: 0,
};

export const locationReducer = (
  state: LocationReducerState = locationReducerInitialState,
  action: UpdateLocationAction,
): LocationReducerState => {
  switch (action.type) {
    case 'location/update': {
      return {
        ...state,
        lat: action.location.lat,
        long: action.location.long,
      };
    }
    default:
      return state;
  }
};

export const selectLocation = (state: RootState) => state.location;

interface UpdateLocationAction {
  type: 'location/update';
  location: {
    lat: number;
    long: number;
  };
}

export const updateLocation = (location: {
  lat: number;
  long: number;
}): UpdateLocationAction => ({
  location,
  type: 'location/update',
});

interface ErrorLocationAction {
  type: 'location/error';
  error: Error;
}

export const errorLocation = (error: Error): ErrorLocationAction => ({
  error,
  type: 'location/error',
});
