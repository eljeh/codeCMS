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


        <!-- Contact Info Section -->
        <div class="grouped-itemList contractInfo">
          <strong>Contact Info:</strong>

          <label for="expandButtons" class="expandList">
              - Collapse List
              <input name="expandButtons" class="expand" type="checkbox" checked/>
          </label>

          <div class="itemList sideNavButtons">

              <!-- Iterate through linetypes for dynamic contact info fields -->
              <div class="grouped-item contactLine" v-for="(faq, index) in faqs" :key="index">
                
                <span>{{ index + 1 }}:</span>
                <!-- Conditional rendering of inputs based on LineType -->
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

              </div>
						</div>
              <!-- Buttons to Add/Remove Lines -->
              <div class="itemListControl navfieldControls">
          			<button @click.prevent="addEntry">+ New Line</button>
          			<button @click.prevent="removeEntry">- Last Line</button>
        		</div>
      		</div>

			<!-- Copy to Clipboard -->
			<div class="codeControls">
				<button @click="copyToClipboard">Copy</button>
			</div>
		</form>

		<!-- Display the generated code -->
		<pre><code ref="codeBlock">{{ codeBlock }}</code></pre>
	</div>
</template>

<script>
//import { marked } from 'marked';

const data = {
	title: 'Frequently asked questions',
	description: 'We will provide ongoing updates and share information as it becomes available.Please revisit this page regularly for further details.',
  faqs: [
    { label: 'Link 1', body: '#' },
    { label: 'Link 2', body: '#' },
    { index, label: 'Link 3', body: '#' },
    { label: 'Link 4', body: '#' },
  ],
  codeBlock: `<section id="home" data-type="background" data-speed="10" class="pages">
  <article>
    <div class="faq-container">
      <h2 class="white-heading">{{title}}</h2>
      <hr class="faq-hr" />
      <p class="white-heading mb-3">{{description}}</p>

      <div class="tabs">
        {{faqs}}
      </div>

      <p class="white-heading pt-2 pb-2">This site contains references to forward looking information which is subject
        to certain assumptions, risks and uncertainties. We encourage shareholders to review the following information
        <a class="white-link" href="/siteassets/pdfs/investors/unlocking-shareholder-value/tce-liquids-spinoff-fli.pdf"
          target="_blank">here</a>.
      </p>

    </div>
  </article>
</section>`,
};

export default {
	data() {
		return {
			title: data.title,
			description: data.description,
      faqs: data.faqs,
			codeBlock: data.codeBlock,
		};
	},
	methods: {
		updateCode() {
      const faqsHtml = this.faqs
					.map((faq) => `<div class="tab">
             <input type="checkbox" id="chck${faq.index}">
             <label class="tab-label" for="chck${faq.index}">${faq.label}</label>
             <div class="tab-content">
               ${faq.body}
             </div>
           </div>`)
					.join('\n        ');


			// Properly construct the codeBlock with reactive data properties
			this.codeBlock = data.codeBlock
				.replace('{{title}}', this.title)
				.replace('{{description}}', this.description)
        .replace('{{faqs}}', faqsHtml);
		},
			// Add a new empty line type entry
      addLink() {
      this.faqs.push({ label: '', body: ''});
    },
    removeLink() {
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
</style>









