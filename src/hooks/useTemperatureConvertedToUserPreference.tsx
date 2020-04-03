import {useSelector} from 'react-redux';
import {selectTemperatureUnit} from '../reducers/userReducer';

export const convertToFahrenheit = (temperature: number) =>
  (temperature * 9) / 5 + 32;

export const convertToCelsius = (temperature: number) =>
  ((temperature - 32) * 5) / 9;

export const useTemperatureConvertedToUserPreference = (
  temperatureInCelsius: number,
) => {
  const temperatureUnit = useSelector(selectTemperatureUnit);

  return {
    temperatureUnit,
    convertedTemperature:
      temperatureUnit === 'fahrenheit'
        ? convertToFahrenheit(temperatureInCelsius)
        : temperatureInCelsius,
  };
};
