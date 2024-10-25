<template>
  <div>
    <form @submit.prevent="updateCode">
      <label>
        hero-mobile 
        <input type="text" v-model="heroMobile" placeholder="heroMobile" style="width: 100%;" />
      </label>
      <label>
        hero-desktop 
        <input type="text" v-model="heroDesktop" placeholder="heroDesktop" style="width: 100%;" />
      </label>
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
      heroMobile: data.css.heroMobile,
      heroDesktop: data.css.heroDesktop,
      codeBlock: data.css.codeBlock.trim(),
    };
  },
  methods: {
    updateCode() {

      // Properly construct the codeBlock with reactive data properties
      this.codeBlock = data.css.codeBlock
        .replace('{{heroMobile}}', this.heroMobile)
        .replace('{{heroDesktop}}', this.heroDesktop)
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
    heroMobile() {
      this.updateCode();
    },
    heroDesktop() {
      this.updateCode(); 
    },
  },
  mounted() {
    this.updateCode();
  },
};
</script>

<style scoped>
</style>
