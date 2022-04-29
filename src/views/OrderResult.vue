<template>
  <div class="fit flex-col">
    <div class="flex-col flex-start">
      <div class="flex-shrink page-header">
        <div class="page-title">Предлагаем следующие блюда</div>
      </div>

      <div class="fit-container">
        <div class="fit">
          <div class="content flex-col">
            <template v-if="dishesList">
              <swiper
                  direction="vertical"
                  :updateOnWindowResize="true"
                  :slidesOffsetBefore="20"
                  :space-between="10"
                  :autoHeight="true"
                  :slidesPerView="'auto'"
              >
                <swiper-slide v-for="dish in dishesList"
                              :key="dish.name">
                  <div class="flex-row flex-center flex-end flex-cont-b dish-line">
                    <div class="name">{{ dish.name }}</div>
                    <div class="flex-shrink quantity">х{{ dish.quantity }}</div>
                  </div>
                </swiper-slide>
              </swiper>

              <div class="flex-shrink total">
                <div class="flex-row flex-center flex-cont-b">
                  <div class="total-text">Итого:</div>
                  <div class="flex-shrink price">{{ fullAmount }} ₽</div>
                </div>
              </div>
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
        <app-button class="more-results-btn" @click="more" block bgColor="#8B7ADF" textColor="#fff" height="40px">
          <div class="flex-row flex-center">
            <div class="flex-shrink">Еще варианты</div><app-icon class="button-icon-offset" size="18px" name="arrow-counter-clockwise"/>
          </div>
        </app-button>
        <app-button @click="next" block bgColor="#00CF6F" textColor="#fff" height="40px">
          <div class="flex-row flex-center">
            <div class="flex-shrink">Завершить и перейти к оплате</div><app-icon class="button-icon-offset" size="18px" name="credit-card"/>
          </div>
        </app-button>
        <app-button @click="$router.back" block bgColor="transparent" textColor="var(--tg-theme-text-color)" height="40px">
          Назад
        </app-button>
      </div>

      <div v-if="loading" class="flex-col flex-center vzhuh-image">
        <div class="flex-shrink vzhuh-image__animation">
          <img :src="require('../assets/images/vzhuh.png')" alt="ВЖУУУУХ!">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/icons/arrow-counter-clockwise.svg?sprite';
import '../assets/icons/credit-card.svg?sprite';

import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import AppButton from '@/components/AppButton';
import AppIcon from '@/components/AppIcon';

export default defineComponent({
  name: 'OrderResult',
  components: {
    AppIcon,
    Swiper,
    SwiperSlide,
    AppButton
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    orderResult() {
      return this.$store.state.value.orderResult
    },

    dishesList() {
      return this.orderResult.dishList
    },

    fullAmount() {
      return this.orderResult.fullAmount
    }
  },
  async created() {
    if (this.dishesList) {
      return
    }

    this.$store.setters.setOrderResult({})

    await this.$store.actions.createLazyOrder()
  },
  methods: {
    async next() {
      await this.$store.actions.confirmLazyOrder()

      await this.$store.actions.sendDataToBot()

      window.Telegram.WebApp.close();
    },

    async more() {
      this.loading = true;

      await this.$store.actions.reCreateLazyOrder();

      this.loading = false;
    }
  },
});
</script>

<style lang="scss" scoped>
.more-results-btn {
  margin-bottom: 8px;
}

.dish-line {
  padding: 3px 0 6px;
}

.name {
  color: var(--tg-theme-text-color);
  font-size: 15px;
}

.quantity {
  color: var(--tg-theme-text-color);
  font-size: 15px;
}

.total {
  padding-top: 10px;
  margin-bottom: 20px;
  font-weight: bold;
}

.total-text {
  text-align: right;
  margin-right: 10px;
  font-size: 20px;
  font-weight: bold;
}

.price {
  font-size: 20px;
  font-weight: bold;
}

.content {
  padding-left: 25px;
  padding-right: 25px;
}

.vzhuh-image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.5);
}

.vzhuh-image__animation {
  position: relative;
  top: -10%;
  max-width: 50%;
  animation: tada 0.3s infinite linear;
}

@keyframes tada {
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
</style>
