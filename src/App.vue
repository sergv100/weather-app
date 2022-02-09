<template>
  <city-selector 
    @select-city="updateCity"
  />
  <unit-selector
    :selected-unit="unit"
    @select-unit="updateUnit"
  />
</template>

<script setup>
  import CitySelector from '@/components/CitySelector.vue'
  import UnitSelector from '@/components/UnitSelector.vue'
  import { getWeatherByCityId } from '@/api'
  import { ref, watch } from 'vue'
  import { WeatherUnits } from '@/utils/constants'

  const unit = ref(WeatherUnits.IMPERIAL)
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
    try {
      const rawWeather = await getWeatherByCityId(cityId, unit)
      const { main, wind, weather } = rawWeather
      const { temp, humidity, pressure } = main

      weatherData.value = {
        temp,
        humidity,
        pressure,
        wind,
        weather,
      }
      
    } catch (error) {
      weatherData.value = null
      console.error('Error: ', error)
    }

  }
</script>
