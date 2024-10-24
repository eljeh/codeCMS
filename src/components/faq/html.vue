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
	title: 'Frequently asked questions',
	description: 'We will provide ongoing updates and share information as it becomes available.Please revisit this page regularly for further details.',
  faqs: [
    {
      "label": "What is the South Bow spinoff?",
      "body": "On July 27, 2023, the Board of Directors approved a plan to separate TC Energy into two independent, investment-grade, publicly listed companies: TC Energy Corporation and South Bow Corporation. On Oct. 1, 2024, South Bow legally separated from TC Energy, marking a monumental moment in our shared history."
    },
    {
      "label": "Why did TC Energy spin off its liquids business?",
      "body": "This spinoff is the result of a thoughtful, strategic two-year evaluation and is in line with TC Energy's long-term strategy – enabling an increased focus on complementary business lines – natural gas, natural gas storage and power and energy solutions."
    },
    {
      "label": "When was the separation completed?",
      "body": "The legal separation of South Bow became effective on Oct. 1, 2024."
    },
    {
      "label": "What is the exchange and ticker symbol that South Bow trades under?",
      "body": "South Bow is listed on the Toronto Stock Exchange (TSX) and expected to trade on the New York Stock Exchange (NYSE) under the ticker symbol 'SOBO'. TC Energy common shares continue to trade on the TSX and NYSE under TC Energy's ticker symbol 'TRP'."
    },
    {
      "label": "What did TC Energy shareholders receive in the spinoff?",
      "body": "<p>TC Energy shareholders received:<ul><li>1 new TC Energy Common Share for each TC Energy share they held on the Distribution Record Date of Sept. 25, 2024</li><li>0.2 of a South Bow Common Share for each TC Energy share they held on the Distribution Record Date of Sept. 25, 2024</li></ul></p>"
    },
    {
      "label": "What happens to my TC Energy dividend?",
      "body": "<p>TC Energy and South Bow each intend to declare independent dividends for the quarter ended Dec. 31, 2024 on Nov. 7, 2024, reflecting their respective proportionate amounts of TC Energy's dividend prior to the Arrangement. The dividends are expected to be paid on Jan. 31, 2025 to shareholders of record on Dec. 31, 2024. All dividends, including the expected dividends to be declared on Nov. 7, 2024, are subject to the discretion and approval of each company's respective Board of Directors.</p>"
    },
    {
      "label": "What are the key dates I need to know?",
      "body": "<p>TC Energy currently expects that the following trading markets will develop in connection with the Arrangement:<dl><dt>Due Bill Trading:</dt><dd>The Toronto Stock Exchange (the 'TSX') and New York Stock Exchange (the 'NYSE') will both implement 'due bill' trading markets commencing Sept. 25, 2024 and ending at the close of business on Oct. 1, 2024. Accordingly, TC Energy Common Shares will cease regular way trading between Sept. 25, 2024 and Oct. 1, 2024; any trades of TC Energy Common Shares under the symbol TRP during such period will be on a due bill basis.</dd><dt>'If, As and When Issued' Trading:</dt><dd>The TSX will implement an 'if, as and when issued' trading market for the TC Energy Common Shares and the South Bow Common Shares commencing Sept. 25, 2024 and ending at the close of business on Oct. 1, 2024.</dd><dd>There will not be an 'if, as and when issued' trading market for the TC Energy Common Shares or the South Bow Common Shares on the NYSE.</dd><dt>Regular Way Trading:</dt><dd>TC Energy Common Shares will resume 'regular way' trading on the TSX and the NYSE on Oct. 2, 2024. Any trades of TC Energy Common Shares under the symbol TRP on or after Oct. 2, 2024 will be on an ex-distribution basis (i.e., without the entitlement to receive South Bow Common Shares issuable pursuant to the Arrangement).</dd><dd>The South Bow Common Shares issued pursuant to the Arrangement will commence 'regular way' trading on the TSX on Oct. 2, 2024, but will not trade 'regular way' on the NYSE until one trading day after the U.S. Securities and Exchange Commission (the 'SEC') declares South Bow's registration statement on Form 40-F (the 'Registration Statement') effective. TC Energy currently expects that the South Bow Common Shares will commence 'regular way' trading on the NYSE on or about Oct. 8, 2024.</dd></dl></p>"
    },
    {
      "label": "Where can I access financial information for South Bow?",
      "body": "<p>Our <a href='/siteassets/pdfs/investors/notice-and-access/2024/tce-2024-management-information-circular.pdf' target='_blank'><u>2024 Management Information Circular</u></a> includes the audited carve-out financial statements of the Liquids Pipelines business for the years ended Dec. 31, 2023, 2022 and 2021, the unaudited pro forma financial statements of South Bow for the year ended Dec. 31, 2023 and the audited financial statements of South Bow for the period from incorporation on Dec. 15, 2023 to Dec. 31, 2023. To review these financial statements, please see Schedule G, Schedule H and Schedule I in the 2024 Management Information Circular. For future financial information please visit South Bow's website and SEDAR+ profile.</p>"
    },
    {
      "label": "The Arrangement occurred on a 'tax-free' basis. What does it mean to me as a shareholder?",
      "body": "<p>The use of the phrase 'tax-free' in the <a href='/siteassets/pdfs/investors/notice-and-access/2024/tce-2024-management-information-circular.pdf' target='_blank'><u>2024 Management Information Circular</u></a> is a reference to the tax-deferred nature of the Arrangement. The receipt of South Bow Common Shares pursuant to the Arrangement should not result in taxable income or gain to Holders, (as defined in the Management Information Circular) for Canadian federal income tax purposes or U.S. federal income tax purposes.</p><p>Estimated proportionate allocation of adjusted cost base between TC Energy Common Shares and South Bow Common Shares is expected to be posted on the TC Energy and South Bow websites when available during the fourth quarter in 2024.</p><p>More information can be found in the 'Material Income Tax Considerations – Certain Canadian Federal Income Tax Considerations and Material Income Tax Considerations – Certain United States Federal Income Tax Considerations' section of the 2024 Management Information Circular.</p>"
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