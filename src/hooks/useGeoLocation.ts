import RNLocation from 'react-native-location';
import {useDispatch} from 'react-redux';
import {errorLocation, updateLocation} from '../reducers/locationReducer';

RNLocation.configure({
  distanceFilter: 10000, // Meters
  desiredAccuracy: {
    ios: 'threeKilometers',
    android: 'lowPower',
  },
  // Android only
  androidProvider: 'auto',
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: 'other',
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: true,
  showsBackgroundLocationIndicator: false,
});

export function useGeoLocation() {
  const dispatch = useDispatch();

  const requestPermission = () =>
    RNLocation.requestPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse', // or 'fine'
        rationale: {
          title: 'We need to access your location',
          message:
            'The app needs your coarse location information to be able to give you local advice and to be able to share your reports if you at some point choose to do so. It is only a coarse location and won’t disclose exactly where you are.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    });
  const getLatestLocation = () => {
    RNLocation.getLatestLocation({timeout: 60000})
      .then(latestLocation => {
        if (latestLocation) {
          dispatch(
            updateLocation({
              lat: latestLocation.latitude,
              long: latestLocation.longitude,
            }),
          );
        }
      })
      .catch(error => {
        dispatch(
          errorLocation({
            error,
          }),
        );
      });
  };
  return {
    requestPermission,
    getLatestLocation,
  };
}
