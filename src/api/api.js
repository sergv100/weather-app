import listCities from './city.list.json'
// TODO: move const to env
const API_URL = 'api.openweathermap.org/data/2.5/weather'
const API_KEY = ''

export async function getWeatherByCityId (cityId) {
  try {    
    const response = await fetch(`${API_URL}?id=${cityId}&appid=${API_KEY}`)
    return await response.json()
  } catch (error) {
    throw new Error('Can\'t get data from the api', error)
  }
}

export async function getCities (searchStr) {
  return listCities.filter(c => c.name.toLowerCase().includes(searchStr.toLowerCase()))
}