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

const data = {
	card1Title: 'Supports economic growth',
	card2Title: 'Improves safety and efficiency of energy transport', 
	card3Title: 'Utilizes existing corridors to minimize environmental impact',
	links: [
		{ label: 'Download the fact sheet', url: '/factsheet_oct2024.pdf', style: 'blue-cta-button', external: true },
	],
	codeBlock: `<h2 id="facts" class="text-center mb-3">Key Project Benefits</h2>
<div class="row gap-lg-3 gap-2 gap-lg-2 gap-md-3 px-lg-4 justify-content-md-center mb-4 facts-cards">
	<div class="col-md-4 facts-card-blue text-center">
		<img src="/graphic-elements/tce-white-arrows-up.svg" alt="Up arrow">
		<h5 class="text-light">{{card1Title}}</h5>
	</div>
	<div class="col-md-4 facts-card-black text-center">
		<img src="/graphic-elements/tce-white-arrows-up.svg" alt="Up arrow">
		<h5 class="text-light">{{card2Title}}</h5>
	</div>
	<div class="col-md-4 facts-card-blue text-center">
		<img src="/graphic-elements/tce-white-arrows-up.svg" alt="Up arrow">
		<h5 class="text-light">{{card3Title}}</h5>
	</div>
</div>
<p class="text-center">{{links}}</p>
`,
};

export default {
	data() {
		return {
			card1Title: data.card1Title,
			card2Title: data.card2Title, 
			card3Title: data.card3Title, 
			links: data.links,
			codeBlock: data.codeBlock,
		};
	},
	methods: {
		updateCode() {

			const linksHtml = this.links
			.map((link) => `<a class="${link.style}" href="${link.url}"${link.external ? ' target="_blank"' : ''}>${link.label}</a>`)
			.join('\n        ');

			this.codeBlock = data.codeBlock
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
