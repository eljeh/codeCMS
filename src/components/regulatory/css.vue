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
.regulatory-bg {
    background: linear-gradient(to right, #191919, #474747);
    background-size: cover;
}
.ferc-header {
    padding: 1.4em 2em 1.1em;
    background-color: #0D64EF;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.table-cell {
    background-color: #FAFAFA;
    padding: 1.4em 2em 1.1em;
    margin-bottom: 1px;
}
.table-cell:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}

.ferc-table .table-cell, .ferc-table .table-cell .telephone, .ferc-table .table-cell .fax ,.ferc-table .table-cell .email {
color: #191919 !important;
}

@media (max-width: 991px) {
.table-cell span {
    display: block;
    margin-bottom: 10px;
}
.ferc-header, .table-cell {
        padding: 1.4em 1em 1.1em;
 }
}
.RichTextBlock p {
text-wrap: pretty;
}
.dark-theme .telephone:before {
   content: url(icn_phone_charcoal50.svg) !important;
}
.dark-theme .fax:before {
content: url(icn_fax_charcoal50.svg);
}
.dark-theme .email:before {
    content: url(icn_email_charcoal50.svg) !important;
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














