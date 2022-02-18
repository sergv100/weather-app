<template>
  <div class="container">
    <city-selector 
      @select-city="updateCity"
    />
    <unit-selector
      :selected-unit="unit"
      @select-unit="updateUnit"
    />
    <weather-widget
      :unit="unit"
      :weather="weatherData"
    />
  </div>
</template>

<script setup>
  import CitySelector from '@/components/CitySelector'
  import UnitSelector from '@/components/UnitSelector'
  import WeatherWidget from '@/components/WeatherWidget'
  import { getWeatherByCityId } from '@/api'
  import { ref, watch } from 'vue'
  import { WeatherUnits } from '@/utils/constants'

  const unit = ref(WeatherUnits.METRIC)
  const cityId = ref(null)
  const weatherData = ref(null)

  const updateUnit = (newUnit) => unit.value = newUnit

  const updateCity = (id) => cityId.value = id

  watch(
    cityId,
    (id) => getWeather(id, unit.value)
  )

  watch(
    unit,
    (u) => getWeather(cityId.value, u)
  )

  const getWeather = async (cityId, unit) => {
    if (!cityId) return
    try {
      const rawWeather = await getWeatherByCityId(cityId, unit)
      const { main, wind, weather } = rawWeather
      const { temp, humidity, pressure } = main

      const { icon, main: shortDesc, description: fullDesc } = weather[0];

      weatherData.value = {
        temp: Math.round(temp),
        humidity,
        pressure,
        wind,
        icon: `${import.meta.env.VITE_WEATHER_ICONS_URL}${icon}@2x.png`,
        shortDesc,
        fullDesc,
      }
      
    } catch (error) {
      weatherData.value = null
      console.error('Error: ', error)
    }

  }
</script>
