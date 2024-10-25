<template>
	<div>
		<form @submit.prevent="updateCode">
			<!-- <label>
				Title:
				<input type="text" v-model="title" placeholder="Title" style="width: 100%;" />
			</label>
			<label>
				Description:
				<textarea v-model="description" placeholder="Description" style="width: 100%; height: 10ch"></textarea>
			</label> -->
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
			title: data.css.title,
			description: data.css.description,
			codeBlock: data.css.codeBlock,
		};
	},
	methods: {
		updateCode() {

			// Properly construct the codeBlock with reactive data properties
			this.codeBlock = data.css.codeBlock
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














