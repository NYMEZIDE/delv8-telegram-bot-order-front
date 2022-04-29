<template>
  <div class="fit flex-col">
    <div class="flex-col">
      <div class="flex-shrink page-header">
        <div class="page-title">Максимальная сумма заказа</div>
      </div>

      <div class="fit-container">
        <div class="fit">
          <div class="content flex-row flex-wrap flex-start flex-a-i-start flex-a-c-start">
            <div v-for="value in orderAmounts"
                 class="flex-col flex-shrink amount-line"
                 :key="value">
              <app-button class="order-card"
                          block
                          :bgColor="selectedValue === value ? 'var(--app-active-button-color)' : 'var(--app-button-color)'"
                          :opacity="selectedValue === value ? '0.4' : '0.15'"
                          text-color="var(--app-button-text-color)"
                          @click="setValue(value)">
                {{ value }}
              </app-button>
            </div>
            <div v-if="showInput" class="input-wrap offset-bottom">
              <app-input :model-value="selectedValue" @update:modelValue="setValue($event)" placeholder="Желаемая сумма заказа" autofocus />
            </div>
          </div>
        </div>
      </div>

      <div class="flex-shrink page-footer">
        <app-button class="offset-bottom" @click="showInput = !showInput" block bgColor="#8B7ADF" textColor="#fff" height="40px">
          <div class="flex-row flex-center">
            <div class="flex-shrink">
              <template v-if="showInput">
                Скрыть ручной ввод
              </template>
              <template v-else>
                Ручной ввод
              </template>
            </div>
            <app-icon class="button-icon-offset" size="18px" name="pencil-simple"/>
          </div>
        </app-button>
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
import '../assets/icons/pencil-simple.svg?sprite';

import { defineComponent } from 'vue'
import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import AppIcon from '@/components/AppIcon';

export default defineComponent({
  name: 'OrderAmount',
  components: {
    AppInput,
    AppButton,
    AppIcon
  },
  data() {
    return {
      showInput: false
    };
  },
  computed: {
    nextDisabled() {
      return !this.selectedValue;
    },

    selectedValue() {
      return this.$store.state.value.orderAmount
    },

    orderAmounts() {
      return [500, 1000, 2000, 3000, 4000, 5000]
    },
  },
  methods: {
    next() {
      if (this.nextDisabled) {
        return;
      }

      this.$router.push('/order-result')
    },

    setValue(value) {
      this.$store.setters.setOrderAmount(value)
    }
  },
});
</script>

<style lang="scss" scoped>
.offset-bottom {
  margin-bottom: 8px;
}

.amount-line {
  width: 31.33333%;
  margin: 1%;
  height: 70px;
}

.input-wrap {
  padding: 10px 0;
}

.content {
  padding-top: 10px;
}
</style>
