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
				Footnote:
				<input type="text" v-model="footnote" placeholder="footnote" style="width: 100%;" />
			</label>

			<div class="grouped-itemList contractInfo">
          <strong>Contact Info:</strong>

          <label for="expandButtons" class="expandList">
              Collapse List
              <input name="expandButtons" class="expand" type="checkbox" checked/>
          </label>

          <div class="itemList sideNavButtons">


              <div class="grouped-item contactLine" v-for="(lineitem, index) in lineitems" :key="index">
                
                <span>{{ index + 1 }}:</span>

                <div class="inputLine">

                  <label>
                    goal:
                    <input type="text" placeholder="goal" style="width: 100%;" v-model="lineitem.goal"/>
                  </label>
                  <label>
                    status:
                    <input type="text" placeholder="status" style="width: 100%;" v-model="lineitem.status"/>
                  </label>

                </div>

                <div class="reorderButtons">
                  <button @click.prevent="moveItemUp(index)" :disabled="index === 0">↑</button>
                  <button @click.prevent="moveItemDown(index)" :disabled="index === lineitems.length - 1">↓</button>
                </div>

              </div>
						</div>

              <div class="itemListControl navfieldControls">
          			<button @click.prevent="addEntry">+ New Line</button>
          			<button @click.prevent="removeEntry">- Last Line</button>
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
			lineitems: data.html.lineitems, 
			footnote: data.html.footnote, 
			codeBlock: data.html.codeBlock,
			useUploadedData: false,
		};
	},
	methods: {
		updateCode() {
      const lineitemsHtml = this.lineitems
					.map((lineitem, index) => `<div class="col-md-9 goal shaded-bg">
			<p>${lineitem.goal}</p>
			</div>
			<div class="col-md-3 status">
				<p class="text-uppercase">${lineitem.status}</p>
			</div>`)
					.join('\n        ');


			// Properly construct the codeBlock with reactive data properties
			this.codeBlock = data.html.codeBlock
				.replace('{{title}}', this.title)
        .replace('{{lineitems}}', lineitemsHtml)
        .replace('{{footnote}}', this.footnote);
		},
		// Add a new empty line type entry
		addEntry() {
      this.lineitems.push({ goal: '', status: ''});
    },
    removeEntry() {
      this.lineitems.pop();
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
			navigator.clipboard.writeText(this.codeBlock)
			.then(() => {
				alert('CodeBlock copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy code to clipboard. Please try again.');
    });
},
		moveItemUp(index) {
      if (index > 0) {
        const item = this.lineitems.splice(index, 1)[0];
        this.lineitems.splice(index - 1, 0, item);
      }
    },
    moveItemDown(index) {
      if (index < this.lineitems.length - 1) {
        const item = this.lineitems.splice(index, 1)[0];
        this.lineitems.splice(index + 1, 0, item);
      }
    },
		downloadData() {
      const jsonData = JSON.stringify({
        html: {
          title: this.title,
          lineitems: this.lineitems,
          footnote: this.footnote,
          codeBlock: this.codeBlock
        }
      }, null, 2);

      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'timeline-html.json';
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
            this.lineitems = uploadedData.html.lineitems;
            this.footnote = uploadedData.html.footnote;
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
		footnote() {
			this.updateCode();
		},
    lineitems: {
				handler() {
					this.updateCode();
				},
				deep: true,
			},
	},
	mounted() {
		if (!this.useUploadedData) {
      this.title = data.html.title;
      this.lineitems = data.html.lineitems;
      this.footnote = data.html.footnote;
      this.codeBlock = data.html.codeBlock;
    }
		this.updateCode();
	},
};
</script>
