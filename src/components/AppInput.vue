<template>
  <div class="app-input">
    <input :class="classes"
           ref="elem"
           :readonly="readonly"
           :placeholder="placeholder"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           @keypress.enter="element.blur()"
           v-bind="$attrs">
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  name: 'AppInput',
  props: {
    invalid: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    label: {
      type: String,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    modelValue: {},
    placeholder: {},
  },
  data() {
    return {
      mounted: false,
    };
  },
  computed: {
    element() {
      return this.$refs.elem;
    },

    classes() {
      return {
        'input': true,
        'invalid': !!this.$props['invalid'] && this.invalid,
        'disabled': (!!this.$props['disabled'] && this.disabled) || this.readonly,
      };
    },
  },
  methods: {
    focus() {
      if (this.element) {
        this.element.focus();
      }
    },
  },
  mounted() {
    this.mounted = true;

    setTimeout(() => {
      if (this.mounted && this.autofocus) {
        this.focus();
      }
    }, 100);
  },
});
</script>

<style scoped lang="scss">
.app-input {
  //
}

.input {
  display: block;
  position: relative;
  height: 40px;
  line-height: 1;
  margin: 0 auto 1px;
  padding: 0 20px;
  text-align: center;
  color: #000;
  border: 1px solid #e3e3e3;
  outline: none;
  letter-spacing: .03em;
  width: 100%;
  max-width: 100%;
  outline: 0;
  outline-offset: 0;
  box-shadow: none;
  font-size: 15px;
  border-radius: 23px;

  &.invalid {
    background-color: rgba(198, 8, 28, 0.08);
    border-color: #ce7780;
  }

  &.disabled {
    opacity: 0.8;
    user-select: none !important;
    cursor: default;
  }

  &:not(.disabled):focus {
    outline: none;
  }
}

</style>
