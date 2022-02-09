<template>
  <div v-if="!weather" class="weather-widget weather-widget_empty">
    No one city is selected
  </div>
  <div 
    v-else
    :class="`weather-widget_${unit}`"
    class="weather-widget widget"
  >
    <!-- TODO: convert main part of widget to a component -->
    <div class="widget--main">
      <span class="weather-widget--temp">{{ weather.temp }}</span>
      <img 
        :src="weather.icon" 
        :alt="weather.shortDesc"
        class="weather-widget--icon"
      >
      <span>{{ weather.fullDesc }}</span>
    </div>
    <!-- TODO: convert footer part of widget to a component -->
    <div class="widget--footer">
      <div class="weather-widget--pressure widget-footer-item">
        <span class="widget-footer-item--label">pressure:</span>
        <span>{{ weather.pressure }}</span>
      </div>
      <div class="weather-widget--humidity widget-footer-item">
        <span class="widget-footer-item--label">humidity:</span>
        <span>{{ weather.humidity }}</span>
      </div>
      <div class="weather-widget--wind widget-footer-item">
        <span class="widget-footer-item--label">wind&nbsp;speed:</span>
        <span>{{ weather.wind.speed }}</span>
      </div>
    </div>
  </div>
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
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .widget--footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    padding-top: 30px;

    & > div {
      flex: 1 1 auto;
      text-align: center;
    }
  }

  .weather-widget {
    color: #fff;
    padding-top: 40px;
    width: 100%;

    &_empty {
      text-align: center;
    }
    
    &--temp {
      font-size: 4rem;
      &::after {
        font-size: 3rem;
        color: inherit;
      }
    }

    &--humidity {
      &::after {
        content: '%';
        padding-left: 5px;
      }
    }

    &--pressure {
      &::after {
        content: 'hPa';
        padding-left: 5px;
      }
    }

    &--wind {
      &::after {
        padding-left: 5px;
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
      
      .weather-widget--wind {

        &::after {
          content: 'm/s'
        }
      }
    }

    &_imperial {
      .weather-widget--temp {
  
        &::after {
          content: '\2109';
        }
      }

      .weather-widget--wind {
        
        &::after {
          content: 'm/h'
        }
      }
    }
  }

  .widget-footer-item {
    font-size: 1.2rem;

    & + & {
      border-left: 1px solid #fff;
    }

    &--label {
      display: block;
      font-size: 1rem;
      padding-bottom: 10px;
    }
  }
</style>
