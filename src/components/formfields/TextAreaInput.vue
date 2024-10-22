<template>
  <label>
    {{ label }}:
    <textarea
      v-model="textareaValue"
      :placeholder="placeholder"
      :style="style"
    ></textarea>
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
    textareaValue: {
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
