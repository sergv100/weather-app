import listCities from './city.list.json'
import { WeatherUnits } from '../utils/constants'

export async function getWeatherByCityId (cityId, units = WeatherUnits.METRIC) {
  try {    
    const response = await fetch(`${import.meta.env.VITE_WEATHER_API_URL}?id=${cityId}&appid=${import.meta.env.VITE_WEATHER_CLIENT_ID}&units=${units}`)

    return await response.json()
  } catch (error) {
    console.error('Error: ', error)
  }
}

export async function getCities (searchStr) {
  return listCities.filter(c => c.name.toLowerCase().includes(searchStr.toLowerCase()))
}