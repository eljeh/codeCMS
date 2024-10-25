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



        <div class="grouped-itemList contractInfo">
          <strong>FAQs:</strong>

          <label for="expandButtons" class="expandList">
              Collapse List
              <input name="expandButtons" class="expand" type="checkbox" checked/>
          </label>

          <div class="itemList sideNavButtons">


              <div class="grouped-item contactLine" v-for="(faq, index) in faqs" :key="index">
                
                <span>{{ index + 1 }}:</span>

                <div class="inputLine">

                  <label>
                    Label:
                    <input type="text" placeholder="Label" style="width: 100%;" v-model="faq.label"/>
                  </label>
                  <label>
                    Body:
                    <textarea v-model="faq.body" placeholder="Description" style="width: 100%; height: 10ch"></textarea>
                  </label>

                </div>

                <div class="reorderButtons">
                  <button @click.prevent="moveItemUp(index)" :disabled="index === 0">↑</button>
                  <button @click.prevent="moveItemDown(index)" :disabled="index === faqs.length - 1">↓</button>
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
			description: data.html.description,
      faqs: data.html.faqs,
			codeBlock: data.html.codeBlock,
		};
	},
	methods: {
		updateCode() {
      const faqsHtml = this.faqs
					.map((faq, index) => `<div class="tab">
             <input type="checkbox" id="chck${index+1}">
             <label class="tab-label" for="chck${index+1}">${faq.label}</label>
             <div class="tab-content">
               ${faq.body}
             </div>
           </div>`)
					.join('\n        ');


			// Properly construct the codeBlock with reactive data properties
			this.codeBlock = data.html.codeBlock
				.replace('{{title}}', this.title)
				.replace('{{description}}', this.description)
        .replace('{{faqs}}', faqsHtml);
		},
			// Add a new empty line type entry
    addEntry() {
      this.faqs.push({ label: '', body: ''});
    },
    removeEntry() {
      this.faqs.pop();
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
        const item = this.faqs.splice(index, 1)[0];
        this.faqs.splice(index - 1, 0, item);
      }
    },
    moveItemDown(index) {
      if (index < this.faqs.length - 1) {
        const item = this.faqs.splice(index, 1)[0];
        this.faqs.splice(index + 1, 0, item);
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
    faqs: {
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


<style>
	.contactLine label{
		display: flex;
	}
	.inputLine{
    flex: 1;
    display: flex;
    gap: 1em;
    flex-direction: column;
	}
	.inputLine label{
		flex: 1;
    gap: 1em;
		text-wrap: nowrap;
	}
	.inputLine>div{
		gap: 1em;
		text-wrap: nowrap;
	}
  .reorderButtons {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}
	.reorderButtons button {
		padding: 2px 5px;
		font-size: 12px;
		margin: 2px 0;
	}
	.grouped-item {
		display: flex;
		align-items: center;
	}
</style>
