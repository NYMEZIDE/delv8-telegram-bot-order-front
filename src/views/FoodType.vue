<template>
  <div class="fit flex-col">
    <div class="flex-col">
      <div class="flex-shrink page-header">
        <div class="page-title">Какую кухню предпочитаете?</div>
      </div>

      <div class="fit-container">
        <div class="fit">
          <div class="content flex-col">
            <template v-if="foodTypes.length">
              <swiper
                  direction="vertical"
                  :slidesOffsetBefore="20"
                  :updateOnWindowResize="true"
                  :loop="true"
                  :freeMode="true"
                  :slidesPerView="'auto'"
                  :space-between="10"
              >
                <swiper-slide v-for="type in foodTypes"
                              class="flex-shrink flex-col"
                              :key="type.id">
                  <app-button class="flex-shrink food-card flex"
                              :class="{ active: isActive(type.id) }"
                              block
                              :bgColor="itemColor(type.id)"
                              :opacity="opacity(type.id)"
                              text-color="var(--app-button-text-color)"
                              @click="selectKitchen(type)">
                    <div class="flex-row flex-center food-card__inner">
                      <div class="flex-shrink image">
                        <img :src="require(`../assets/images/${type.name}.png`)" :alt="type.icon"/>
                      </div>
                      <div class="text">
                        {{ type.name }}
                      </div>
                    </div>
                  </app-button>
                </swiper-slide>
              </swiper>
            </template>
            <template v-else>
              <div class="flex-row flex-center">
                <div class="flex-shrink">Загрузка...</div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="flex-shrink page-footer">
        <app-button @click="next" :disabled="nextDisabled" block bgColor="#00CF6F" textColor="#fff" height="40px">
          <div class="flex-row flex-center">
            <div class="flex-shrink">Далее</div><app-icon class="button-icon-offset" size="18px" name="caret-right"/>
          </div>
        </app-button>
        <app-button @click="$router.back" block bgColor="transparent" textColor="var(--tg-theme-text-color)" height="40px">
          Назад
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/icons/caret-right.svg?sprite';

import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import AppButton from '@/components/AppButton';
import AppIcon from '@/components/AppIcon';

export default defineComponent({
  name: 'FoodType',
  components: {
    Swiper,
    SwiperSlide,
    AppButton,
    AppIcon
  },
  computed: {
    nextDisabled() {
      return !this.selectedValue.length;
    },

    selectedValue() {
      return this.$store.state.value.kitchenSelected
    },

    foodTypes() {
      return this.$store.state.value.kitchenList
    }
  },
  methods: {
    next() {
      if (this.nextDisabled) {
        return;
      }

      this.$router.push('/order-amount')
    },

    isSelectedKitchenItem(id) {
      return !!this.selectedValue.find(e => e.id === id)
    },

    selectKitchen(kitchenItem) {
      if (this.isSelectedKitchenItem(kitchenItem.id)) {
        this.$store.setters.setKitchen(this.selectedValue.filter(e => e.id !== kitchenItem.id))
      } else {
        this.$store.setters.setKitchen([...this.selectedValue, kitchenItem])
      }
    },

    itemColor(value) {
      return this.isSelectedKitchenItem(value) ? 'var(--app-active-button-color)' : 'var(--app-button-color)';
    },

    opacity(value) {
      return this.isSelectedKitchenItem(value) ? '0.4' : '0.15';
    },

    isActive(value) {
      return !!this.isSelectedKitchenItem(value);
    }
  },
  async created() {
    await this.$store.actions.getKitchens()
  }
});
</script>

<style lang="scss" scoped>
.image {
  width: 50%;
  height: 70px;
  padding: 5px;
  text-align: center;
  transition: 0.1s;
  overflow: hidden;
}

.active {
  font-weight: bold;
}

.text {
  font-size: 20px;
  z-index: 1;
  text-align: left;
}

.active .image {
  transform: scale(1.6);
}

.food-card {
  overflow: hidden;
}

.food-card__inner {
  width: 100%;
}
</style>
