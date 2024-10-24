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
.facts-wrapper {
  background-image: url(background-topography-white-1.jpg);
  background-size: cover;
}
.facts-cards img {
  width: 15%;
  margin-bottom: 1.4em;
}
.facts-card-blue {
  align-items: center;
  background: linear-gradient(to right, #0D64EF, #3D83F2);
  border-radius: 10px;
  padding: 2.2em 1.6em 3em;

}
.facts-card-black {
  align-items: center;
  background: linear-gradient(to right, #191919, #474747);
  border-radius: 10px;
  padding: 2.2em 1.6em 3em;
 
}
.facts-card-black, .facts-card-blue {
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}
 .facts-card-blue h5, .facts-card-black h5 {
    font-size: 1.2rem;
  }
@media (min-width: 991px) {
  .facts-card-blue h5, .facts-card-black h5 {
    font-size: 1.1rem;
  }
  .facts-cards img {
    width: 17%;
    margin-bottom: 2em;
  }
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




