<template>
  <div v-if="!weather">
    No one city is selected
  </div>
  <div 
    v-else
    :class="`weather-widget_${unit}`"
    class="weather-widget widget"
  >
    <div class="widget--main">
      <span class="weather-widget--temp">{{ weather.temp }}</span>
      <img 
        :src="weather.icon" 
        :alt="weather.shortDesc"
        class="weather-widget--icon"
      >
      <span>{{ weather.fullDesc }}</span>
    </div>
    <div class="widget--footer">

    </div>
  </div>
  <!-- <pre>
    {{ weather }}
  </pre> -->
</template>

<script setup>
  import { WeatherUnits } from '@/utils/constants'

  defineProps({
    weather: {
      type: [Object, null],
      default() {
        return null
      }
    },
    unit: {
      type: String,
      required: true,
      validator(val) {
        return [
          WeatherUnits.METRIC,
          WeatherUnits.IMPERIAL
        ].includes(val)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .widget--main {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .weather-widget {
    color: #fff;
    padding-top: 40px;
    
    &--temp {
      font-size: 4rem;
      &::after {
        font-size: 3rem;
        color: inherit;
      }
    }

    &--icon {
      width: 128px;
    }

    &_metric {
      .weather-widget--temp {
  
        &::after {
          content: '\2103';
        }
      }      
    }

    &_imperial {
      .weather-widget--temp {
  
        &::after {
          content: '\2109';
        }
      }
    }
  }
</style>
