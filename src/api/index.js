import listCities from './city.list.json'

export async function getWeatherByCityId (cityId) {
  try {    
    const response = await fetch(`${import.meta.env.VITE_WEATHER_API_URL}?id=${cityId}&appid=${import.meta.env.VITE_WEATHER_CLIENT_ID}`)
    return await response.json()
  } catch (error) {
    throw new Error('Can\'t get data from the api', error)
  }
}

export async function getCities (searchStr) {
  return listCities.filter(c => c.name.toLowerCase().includes(searchStr.toLowerCase()))
}