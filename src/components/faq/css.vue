<template>
	<div>
		<form @submit.prevent="updateCode">
			<label>
				Title:
				<input type="text" v-model="title" placeholder="Title" style="width: 100%;" />
			</label>
			<label>
				Description:
				<textarea v-model="description" placeholder="Description" style="width: 100%; height: 10ch"></textarea>
			</label>
		</form>
		<div class="codeControls">
			<button @click="copyToClipboard">Copy</button>
		</div>
		<pre><code ref="codeBlock">{{ codeBlock }}</code></pre>
	</div>
</template>

<script>
//import { marked } from 'marked';

const data = {
	title: 'title',
	description: 'description',
	codeBlock: `#home {
 background: url(background-black-grid-1920x1080.jpg) 50% 0 repeat fixed;
   min-height: 1000px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #191919;
}
 
@media (max-width: 991px) {
 #home { background-image: none;
background-color: #191919;
}
}

#home article {
  width: 100%;
}

.tab-content dl {
margin-left: 1em;
}
.tab-content dd {
    margin: 0.5em 1em 1em;
    display: list-item;
    list-style-type: disc;
}`,
};

export default {
	data() {
		return {
			title: data.title,
			description: data.description,
			codeBlock: data.codeBlock,
		};
	},
	methods: {
		updateCode() {

			// Properly construct the codeBlock with reactive data properties
			this.codeBlock = data.codeBlock
				.replace('{{title}}', this.title)
				.replace('{{description}}', this.description)
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
		title() {
			this.updateCode();
		},
		description() {
			this.updateCode(); 
		},
	},
	mounted() {
		this.updateCode();
	},
};
</script>













