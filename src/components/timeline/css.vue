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
	codeBlock: `<style>
.timeline-bg {
  background: linear-gradient(to right, #191919, #474747);

}
.mb-n1 {
  margin-bottom: -1px;
}
.timeline {
  border: 1px solid rgba(255, 250, 250, .3);
  border-radius: 10px;
  overflow: hidden;
}
.goal {
  padding: 0 2em;
  border-bottom: 1px solid rgba(255, 250, 250, .3);
  background-color: #2b2b2b;
}
.timeline .shaded-bg {
    background: #191919;
}
.status {
  padding: 0 2em;
  background-color: #0D64EF;
  border-bottom: 1px solid rgba(255, 250, 250, .3);
}

</style>`,
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




























