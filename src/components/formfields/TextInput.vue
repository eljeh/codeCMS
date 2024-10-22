<template>
  <label>
    {{ label }}:
    <input
      type="text"
      v-model="inputValue"
      :placeholder="placeholder"
      :style="style"
    />
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    style: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style scoped>
</style>
