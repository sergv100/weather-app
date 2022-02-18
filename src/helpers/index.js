import { WeatherUnits } from '../utils/constants';

export const isPossibleUnit = (unit) => {
  const possibleUnits = Object.values(WeatherUnits)
  return possibleUnits.includes(unit)
}