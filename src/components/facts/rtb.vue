<template>
	<div class="wrapper">
		<div class="controls">
			<input type="file" @change="handleFileUpload" accept=".json">
			<button @click="downloadData">Download</button>
		</div>
		<form @submit.prevent="updateCode">
			<label>
				Card1 Title:
				<input type="text" v-model="card1Title" placeholder="card1Title" style="width: 100%;" />
			</label>
			<label>
				Card2 Title:
				<input type="text" v-model="card2Title" placeholder="card2Title" style="width: 100%;" />
			</label>
			<label>
				Card3 Title:
				<input type="text" v-model="card3Title" placeholder="card3Title" style="width: 100%;" />
			</label>

			<div class="inlineFields" v-for="(link, index) in links" :key="index">
				
				<label>
					Label:
					<input type="text" v-model="link.label" placeholder="Link Label" style="width: 100%;" />
				</label>
				
				<label>
					URL:
					<input type="text" v-model="link.url" placeholder="Link URL" style="width: 100%;" />
				</label>

					<label>
						Style:
						<input type="text" v-model="link.style" placeholder="blue-nav-item" style="width: 100%;" />
					</label>
					<label>
						External:
						<input type="checkbox" v-model="link.external" />
					</label>

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
			card1Title: data.rtb.card1Title,
			card2Title: data.rtb.card2Title, 
			card3Title: data.rtb.card3Title, 
			links: data.rtb.links,
			codeBlock: data.rtb.codeBlock,
		};
	},
	methods: {
		updateCode() {

			const linksHtml = this.links
			.map((link) => `<a class="${link.style}" href="${link.url}"${link.external ? ' target="_blank"' : ''}>${link.label}</a>`)
			.join('\n        ');

			this.codeBlock = data.rtb.codeBlock
				.replace('{{card1Title}}', this.card1Title)
				.replace('{{card2Title}}', this.card2Title)
				.replace('{{card3Title}}', this.card3Title)
				.replace('{{links}}', linksHtml);
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
        rtb: {
          card1Title: this.card1Title,
          card2Title: this.card2Title,
          card3Title: this.card3Title,
          links: this.links,
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
            this.card1Title = uploadedData.rtb.card1Title;
            this.card2Title = uploadedData.rtb.card2Title;
            this.card3Title = uploadedData.rtb.card3Title; 
            this.links = uploadedData.rtb.links; 
            this.codeBlock = uploadedData.rtb.codeBlock;
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
		card1Title() {
			this.updateCode();
		},
		card2Title() {
			this.updateCode(); 
		},
		card3Title() {
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
