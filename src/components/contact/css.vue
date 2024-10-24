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
  
  const data = {
    codeBlock: `<style>
.contact-bg {
background-image: url(tce-emblem-white.svg), linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 70%;
}
</style>`,
  };
  
  export default {
    data() {
      return {
        codeBlock: data.codeBlock,
      };
    },
    methods: {
      updateCode() {
  
        // Properly construct the codeBlock with reactive data properties
        this.codeBlock = data.codeBlock
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


