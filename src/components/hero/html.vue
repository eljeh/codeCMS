<template>
	<div class="wrapper">
		<div class="controls">
			<input type="file" @change="handleFileUpload" accept=".json">
			<button @click="downloadData">Download</button>
		</div>
    <form @submit.prevent="updateCode">
      <label>
        Title:
        <input type="text" v-model="title" placeholder="Title" style="width: 100%;" />
      </label>
      <label>
        Description:
        <textarea v-model="description" placeholder="Description" style="width: 100%; height: 10ch"></textarea>
      </label>

      <div class="grouped-itemList navButtons">
        <strong>Navigation Buttons</strong>
        <label for="expandButtons" class="expandList">
            Collapse List
            <input name="expandButtons" class="expand" type="checkbox" checked/>
        </label>

        <div class="itemList sideNavButtons" >
          <div class="grouped-item navButton" v-for="(link, index) in links" :key="index">

            <span>{{ index + 1 }}:</span>
            
            <label class="buttonLabel">
              Label:
              <input type="text" v-model="link.label" placeholder="Link Label" style="width: 100%;" />
            </label>

            <label class="buttonUrl">
              URL:
              <input type="text" v-model="link.url" placeholder="Link URL" style="width: 100%;" />
            </label>

            <div class="buttonOptions">
              <label class="optionStyle">
                Style:
                <select v-model="link.style" >
                  <option value="blue-nav-item">Blue</option>
                  <option value="lime-nav-item">Accent</option>
                </select>
              </label>
              <label class="optionExternal">
                External:
                <input type="checkbox" v-model="link.external" />
            </label>
            </div>

            <div class="reorderButtons">
							<button @click.prevent="moveItemUp(index)" :disabled="index === 0">↑</button>
							<button @click.prevent="moveItemDown(index)" :disabled="index === links.length - 1">↓</button>
						</div>

          </div>
        </div>

        <div class="itemListControls navfieldControls">
          <button @click.prevent="addLink">+ New Link</button>
          <button @click.prevent="removeLink">- Last Link</button>
        </div>

      </div>
      
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
      title: data.html.title,
      description: data.html.description,
      links: data.html.links,
      codeBlock: data.html.codeBlock,
    };
  },
  methods: {
    updateCode() {
      // Construct the links part dynamically
      const linksHtml = this.links
        .map((link) => `<a class="${link.style}" href="${link.url}"${link.external ? ' target="_blank"' : ''}>${link.label}</a>`)
        .join('\n        ');

      // Properly construct the codeBlock with reactive data properties
      this.codeBlock = data.html.codeBlock
        .replace('{{title}}', this.title)
        .replace('{{description}}', this.description)
        .replace('{{links}}', linksHtml);
    },
    addLink() {
      this.links.push({ label: '', url: '', style: 'blue-nav-item', external: false });
    },
    removeLink() {
      this.links.pop();
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
    moveItemUp(index) {
			if (index > 0) {
				const link = this.links.splice(index, 1)[0];
				this.links.splice(index - 1, 0, link);
			}
		},
		moveItemDown(index) {
			if (index < this.links.length - 1) {
				const link = this.links.splice(index, 1)[0];
				this.links.splice(index + 1, 0, link);
			}
		},
    downloadData() {
      const jsonData = JSON.stringify({
        html: {
          title: this.title,
          description: this.description,
          links: this.links,
          codeBlock: this.codeBlock
        }
      }, null, 2);

      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hero-html.json';
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
            this.title = uploadedData.html.title;
            this.description = uploadedData.html.description;
            this.links = uploadedData.html.links;
            this.codeBlock = uploadedData.html.codeBlock;
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
    title() {
      this.updateCode();
    },
    description() {
      this.updateCode(); 
    },
    links: {
      handler() {
        this.updateCode();
      },
    deep: true,
    },
  },
  mounted() {
    this.updateCode();
  },
};
</script>

<style scoped>
</style>
