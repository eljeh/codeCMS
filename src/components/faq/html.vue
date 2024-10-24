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
          <strong>Contact Info:</strong>

          <label for="expandButtons" class="expandList">
              - Collapse List
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


const data = {
	title: 'Common Questions',
	description: 'Stay informed with our latest updates. This page is regularly refreshed with new information, so we encourage you to visit often.',
  faqs: [
    {
      "label": "What is the GreenLeaf division?",
      "body": "On March 15, 2025, EcoTech Industries' Board of Directors approved a strategic initiative to divide the company into two distinct entities: EcoTech Industries and GreenLeaf Innovations. The official separation of GreenLeaf from EcoTech was finalized on August 1, 2026, marking a new chapter for both organizations."
    },
    {
      "label": "Why did EcoTech Industries create a separate renewable energy division?",
      "body": "This division is the result of an 18-month strategic analysis and aligns with EcoTech's vision for the future. It allows both companies to concentrate on their core strengths – traditional energy solutions for EcoTech and innovative renewable technologies for GreenLeaf."
    },
    {
      "label": "When was the division completed?",
      "body": "GreenLeaf Innovations officially became an independent entity on August 1, 2026."
    },
    {
      "label": "How can I trade GreenLeaf Innovations stock?",
      "body": "GreenLeaf Innovations is listed on the NASDAQ under the ticker symbol 'LEAF'. EcoTech Industries continues to trade on the NYSE under its existing symbol 'ECOT'."
    },
    {
      "label": "What did EcoTech shareholders receive in this division?",
      "body": "<p>For every share of EcoTech Industries stock owned on the record date of July 15, 2026, shareholders received:<ul><li>1 share of the new EcoTech Industries stock</li><li>0.25 shares of GreenLeaf Innovations stock</li></ul></p>"
    },
    {
      "label": "How does this affect EcoTech's dividend policy?",
      "body": "<p>Both EcoTech Industries and GreenLeaf Innovations will announce their individual dividend policies for Q4 2026 on September 30, 2026. These dividends are expected to be paid on December 15, 2026 to shareholders of record as of November 30, 2026. All dividend declarations are subject to approval by each company's Board of Directors.</p>"
    },
    {
      "label": "What are the important dates for this corporate action?",
      "body": "<p>Key dates for the division process:<dl><dt>Record Date:</dt><dd>July 15, 2026</dd><dt>When-Issued Trading:</dt><dd>July 16-31, 2026 on NASDAQ for both EcoTech and GreenLeaf shares</dd><dt>Distribution Date:</dt><dd>August 1, 2026</dd><dt>Regular Trading:</dt><dd>GreenLeaf shares begin regular trading on NASDAQ on August 3, 2026</dd></dl></p>"
    },
    {
      "label": "Where can I find financial data for GreenLeaf Innovations?",
      "body": "<p>Our <a href='https://www.ecotechindustries.com/investors/2026-annual-report.pdf' target='_blank'><u>2026 Annual Report</u></a> includes pro forma financial statements for both EcoTech Industries and GreenLeaf Innovations. For the most current financial information, please visit GreenLeaf's investor relations website at <a href='https://investors.greenleafinnovations.com' target='_blank'><u>investors.greenleafinnovations.com</u></a>.</p>"
    },
    {
      "label": "Is this division tax-free for shareholders?",
      "body": "<p>The division is intended to be tax-free for U.S. federal income tax purposes. However, this does not constitute tax advice. We recommend consulting with a tax professional regarding your specific situation. Detailed tax information can be found in our <a href='https://www.ecotechindustries.com/investors/tax-implications-2026.pdf' target='_blank'><u>Tax Implications Guide</u></a>.</p>"
    }
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
					.map((faq, index) => `<div class="tab">
             <input type="checkbox" id="chck${index+1}">
             <label class="tab-label" for="chck${index+1}">${faq.label}</label>
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
