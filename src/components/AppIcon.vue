<template>
  <svg
    class="app-icon"
    :style="styles"
    aria-hidden="true"
    focusable="false"
    @click="$emit('click')"
  >
    <use v-if="name" :xlink:href="`#${name}--sprite`"/>
    <slot v-else/>
    <slot name="tooltip"></slot>
  </svg>
</template>

<script>

export default {
  name: 'AppIcon',
  props: {
    name: String,
    size: String,
    color: String,
    width: String,
    height: String,
  },
  computed: {
    styles() {
      const size = this.size || '1em';

      return {
        width: this.width ? this.width : size,
        height: this.height ? this.height : size,
        fill: this.color || 'currentColor',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.app-icon {
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
  word-wrap: normal;
  user-select: none;
}
</style>
