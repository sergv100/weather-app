<template>
  <div class="widget">
    <div 
      v-if="!weather"
      class="widget__empty"
    >
      No one city is selected
    </div>
    <div v-else>
      <div class="widget__main">
        <span 
          :class="`weather-temp_${unit}`"
          class="weather-temp"
        >
          {{ weather.temp }}
        </span>
        <img 
          :src="weather.icon" 
          :alt="weather.shortDesc"
          class="weather-icon"
        >
        <span>{{ weather.fullDesc }}</span>
      </div>
      <div class="widget__footer">
        <div class="footer-list">
          <div class="footer-list__item list-item">
            <span class="list-item__label">pressure:</span>
            <span class="list-item__text weather-pressure">{{ weather.pressure }}</span>
          </div>
          <div class="footer-list__divider"></div>
          <div class="footer-list__item list-item">
            <span class="list-item__label">humidity:</span>
            <span class="list-item__text weather-humidity">{{ weather.humidity }}</span>
          </div>
          <div class="footer-list__divider"></div>
          <div class="footer-list__item list-item">
            <span class="list-item__label">wind&nbsp;speed:</span>
            <span
              :class="`weather-wind_${unit}`"
              class="list-item__text weather-wind"
            >
              {{ weather.wind.speed }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { isPossibleUnit } from '@/helpers'

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
      validator: (val) => isPossibleUnit(val)
    }
  })
</script>

<style lang="scss" scoped>
  .widget {
    color: #fff;
    margin-top: 40px;
    width: 100%;

    &__empty {
      text-align: center;
    }

    &__main {
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }

    &__footer {
      margin-top: 30px;
    }
  }

  .footer-list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__divider {
      min-height: 100%;
      width: 1px;
      background-color: #fff;
    }
  }

  .weather {
    &-temp {
      font-size: 4rem;

      &::after {
        font-size: 3rem;
        color: inherit;
      }

      &_metric {

        &::after {
          content: '\2103';
        }
      }

      &_imperial {

        &::after {
          content: '\2109';
        }
      }
    }

    &-humidity {
      &::after {
        content: '%';
        padding-left: 5px;
      }
    }

    &-pressure {
      &::after {
        content: 'hPa';
        padding-left: 5px;
      }
    }

    &-wind {

      &::after {
        padding-left: 5px;
      }

      &_metric {

        &::after {
          content: 'm/s'
        }
      }

      &_imperial {

        &::after {
          content: 'm/h';
        }
      }
    }

    &-icon {
      width: 128px;
    }
  }

</style>
