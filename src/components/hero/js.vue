<template>
  <div>
    <form @submit.prevent="updateCode">
      <div class="codeControls">
        <button @click="copyToClipboard">Copy</button>
      </div>
    </form>
    <pre><code ref="codeBlock">{{ codeBlock }}</code></pre>
  </div>
</template>

<script>
import data from './data.json';

export default {
  data() {
    return {
      codeBlock: data.js.codeBlock.trim(),
    };
  },
  methods: {
    updateCode() {

      // Properly construct the codeBlock with reactive data properties
      this.codeBlock = data.js.codeBlock
    },
    selectAll() {
      const codeElement = this.$refs.codeBlock;
      const range = document.createRange();
      range.selectNodeContents(codeElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    },
    copyToClipboard() {
      this.selectAll();
      document.execCommand('copy');
      alert('Code copied to clipboard!');
    },
  },
  watch: {
  },
  mounted() {
    this.updateCode();
  },
};
</script>

<style scoped>
</style>
