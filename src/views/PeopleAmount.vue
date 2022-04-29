<template>
  <div class="fit flex-col">
    <div class="flex-col">
      <div class="flex-shrink page-header">
        <div class="page-title">На какое количество людей будет заказ?</div>
      </div>

      <div class="fit-container">
        <div class="fit">
          <div class="content flex-col flex-start">
            <div class="flex-shrink">
              <div class="scroll-item" v-for="i in 10" :key="i">
                <app-button class="people-card"
                            :class="{ active: selectedValue === i }"
                            block
                            :bgColor="selectedValue === i ? 'var(--app-active-button-color)' : 'var(--app-button-color)'"
                            :opacity="selectedValue === i ? '0.4' : '0.15'"
                            text-color="var(--app-button-text-color)"
                            @click="setValue(i)">
                  <div class="flex-row flex-center item-content-wrap">
                    <div class="flex-shrink image">
                      <img v-if="selectedValue === i" src="../assets/images/face-stars.png" alt="face stars"/>
                      <img v-else src="../assets/images/face.png" alt="face"/>
                    </div>
                    <div class="text">
                      x{{ i }}
                    </div>
                  </div>
                </app-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-shrink page-footer">
        <app-button @click="next" :disabled="nextDisabled" block bgColor="#00CF6F" textColor="#fff" height="40px">
          <div class="flex-row flex-center">
            <div class="flex-shrink">Далее</div><app-icon class="button-icon-offset" size="18px" name="caret-right"/>
          </div>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/icons/caret-right.svg?sprite';

import { defineComponent } from 'vue'
import AppButton from '@/components/AppButton';
import AppIcon from '@/components/AppIcon';

export default defineComponent({
  name: 'PeopleAmount',
  components: {
    AppButton,
    AppIcon
  },
  computed: {
    nextDisabled() {
      return this.selectedValue < 1
    },

    selectedValue() {
      return this.$store.state.value.peopleAmount
    },
  },
  methods: {
    next() {
      if (this.nextDisabled) {
        return;
      }

      this.$router.push('/food-type')
    },

    async setValue(value) {
      this.$store.setters.setPeopleAmount(value)
    }
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

.active .image {
  transform: scale(1.6);
}

.text {
  font-size: 20px;
  z-index: 1;
  text-align: center;
}

.item-content-wrap {
  width: 100%;
}

.scroll-item:first-child {
  margin-top: 15px;
}

.page-footer {
  padding-bottom: 16px;
}
</style>
