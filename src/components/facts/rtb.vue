<template>
	<div>
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
