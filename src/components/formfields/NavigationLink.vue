<template>
  <div class="navButton">
    <span>{{ index + 1 }}:</span>

    <!-- Label Input -->
    <TextInput
      label="Label"
      v-model="localLink.label"
      placeholder="Link Label"
      style="width: 100%;"
    />

    <!-- URL Input -->
    <TextInput
      label="URL"
      v-model="localLink.url"
      placeholder="Link URL"
      style="width: 100%;"
    />

    <!-- Style Selection -->
    <SelectInput
      label="Style"
      v-model="localLink.style"
      :options="styleOptions"
    />

    <!-- External Checkbox -->
    <CheckboxInput
      id="external-{{ index }}"
      label="External"
      v-model="localLink.external"
    />

    <div class="reorderButtons">
      <button @click.prevent="moveItemUp(index)" :disabled="index === 0">↑</button>
      <button @click.prevent="moveItemDown(index)" :disabled="index === linetypes.length - 1">↓</button>
    </div>
  </div>
</template>

<script>
// Import Sub-Components
import TextInput from './TextInput.vue';
import SelectInput from './SelectInput.vue';
import CheckboxInput from './CheckboxInput.vue';

export default {
  components: {
    TextInput,
    SelectInput,
    CheckboxInput,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    link: {
      type: Object,
      required: true,
      default: () => ({
        label: '',
        url: '',
        style: 'blue-nav-item',
        external: false,
      }),
    },
  },
  data() {
    return {
      localLink: { ...this.link },
      styleOptions: [
        { value: 'blue-nav-item', text: 'Blue' },
        { value: 'lime-nav-item', text: 'Accent' },
        // Add more styles as needed
      ],
    };
  },
  watch: {
    localLink: {
      handler(newVal) {
        this.$emit('update-link', { ...newVal });
      },
      deep: true,
    },
  },
  methods: {
    removeThisLink() {
      this.$emit('remove-link');
    },
    moveItemUp(index) {
      if (index > 0) {
        this.$emit('move-item-up', index);
      }
    },
    moveItemDown(index) {
      if (index < this.linetypes.length - 1) {
        this.$emit('move-item-down', index);
      }
    },
  },
};
</script>

<style scoped>
</style>
