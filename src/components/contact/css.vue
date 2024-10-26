<template>
	<div class="wrapper">
		<div class="controls">
			<input type="file" @change="handleFileUpload" accept=".json">
			<button @click="downloadData">Download</button>
		</div>
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
        codeBlock: data.css.codeBlock,
      };
    },
    methods: {
      updateCode() {
  
        // Properly construct the codeBlock with reactive data properties
        this.codeBlock = data.css.codeBlock
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
      downloadData() {
      const jsonData = JSON.stringify({
        css: {
          codeBlock: this.codeBlock
        }
      }, null, 2);

      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
		handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const uploadedData = JSON.parse(e.target.result);
            this.codeBlock = uploadedData.css.codeBlock;
            this.useUploadedData = true;
            this.updateCode();
          } catch (error) {
            console.error('Error parsing JSON file:', error);
            alert('Error parsing JSON file. Please make sure it\'s a valid JSON file.');
          }
        };
        reader.readAsText(file);
      }
    },
    },
    watch: {
    },
    mounted() {
      this.updateCode();
    },
  };
  </script>


