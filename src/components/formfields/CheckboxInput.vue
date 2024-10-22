<template>
  <label :for="id">
    <input
      type="checkbox"
      :id="id"
      v-model="checkboxValue"
      :class="inputClass"
    />
    {{ label }}
  </label>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    checkboxValue: {
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
