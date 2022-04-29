<template>
  <button class="app-button"
       :class="classes"
       :style="styles">
    <span class="app-button__slot flex-col flex-center">
      <slot />
    </span>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppButton',
  components: {
    //
  },
  props: {
    bgColor: {
      type: String,
      require: false
    },
    height: {
      type: String,
      default: () => 'initial',
      require: false
    },
    textColor: {
      type: String,
      require: false
    },
    fontSize: {
      type: String,
      require: false
    },
    // Only Dark theme
    opacity: {
      type: String,
      require: false
    },
    disabled: {
      type: Boolean,
      require: false
    },
    block: {
      type: Boolean,
      require: false
    },
  },
  data() {
    return {
      //
    };
  },
  computed: {
    styles() {
      return {
        color: this.textColor,
        fontSize: this.fontSize,
        height: this.height,
        '--bg-color': this.bgColor,
        '--opacity': this.opacity,
      }
    },
    classes() {
      let result = [];

      if (this.disabled) {
        result.push('app-button_disabled')
      }

      if (this.block) {
        result.push('app-button_block')
      }

      return result;
    },
  },
  methods: {
    //
  },
});
</script>

<style scoped lang="scss">
.app-button {
  --bg-color: #ddd;
  --opacity: 1;

  position: relative;
  border: none;
  padding: 5px 15px;
  text-align: center;
  color: #000;
  font-size: 15px;
  border-radius: 20px;
  background: transparent;
  transition: 0.05s;

  &_disabled {
    opacity: 0.5;
  }

  &_block {
    width: 100%;
  }

  &:not(.app-button_disabled) {
    &:active::after {
      filter: brightness(80.6%) contrast(147.5%);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    border-radius: 20px;
    background-color: var(--bg-color);
  }
}

.app-button__slot {
  position: relative;
  z-index: 2;
}
</style>

<style lang="scss">
.dark .app-button::after {
  opacity: var(--opacity);
}
</style>
