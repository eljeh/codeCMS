<template>
	<div>
		<form @submit.prevent="updateCode">
			<label>
				Title:
				<input type="text" v-model="title" placeholder="Title" style="width: 100%;" />
			</label>

      		<!-- Contact Info Section -->
      		<div class="navButtons contractInfo">
        		<strong>Contact Info:</strong>

        		<label for="expandButtons" class="expandList">
          			- Collapse List
          			<input name="expandButtons" class="expand" type="checkbox" checked/>
        		</label>

        		<div class="sideNavButtons">
          			<!-- Iterate through linetypes for dynamic contact info fields -->
          			<div class="contactLine" v-for="(linetype, index) in linetypes" :key="index">
            			<span>{{ index + 1 }}:</span>

						<!-- Dropdown to select the LineType (Phone, Email, Text) -->
						<label class="optionStyle">
							LineType:
							<select v-model="linetype.style">
								<option value="phoneStyle">Phone</option>
								<option value="emailStyle">Email</option>
								<option value="textStyle" selected="selected">Text</option>
							</select>
						</label>

						<!-- Conditional rendering of inputs based on LineType -->
						<div class="inputLine" :class="linetype.style">
							<!-- Phone input section -->
							<div class="phone">
								<label>
									Number:
									<input type="text" placeholder="#-###-###-####" style="width: 100%;" v-model="linetype.phonenumber"/>
								</label>
								<label class="optionStyle">
									Type:
									<select v-model="linetype.phonetype">
										<option value="telLocal">Local</option>
										<option value="telTollFree">Toll-Free</option>
										<option value="telFax">Fax</option>
									</select>
								</label>
							</div>

							<!-- Email input section -->
							<div class="address">
								<label>
									Email:
									<input type="text" placeholder="name@domain.com" style="width: 100%;" v-model="linetype.email"/>
								</label>
								<label>
									Display Name:
									<input type="text" placeholder="John Smith" style="width: 100%;" v-model="linetype.displayname"/>
								</label>
							</div>

							<!-- Text input section -->
							<div class="text">
								<label>
									Text Line:
									<input type="text" placeholder="Line of Text" style="width: 100%;" v-model="linetype.text"/>
								</label>
							</div>
						</div>

						<div class="reorderButtons">
							<button @click.prevent="moveItemUp(index)" :disabled="index === 0">↑</button>
							<button @click.prevent="moveItemDown(index)" :disabled="index === linetypes.length - 1">↓</button>
						</div>
					</div>
				</div>

				<!-- Buttons to Add/Remove Lines -->
				<div class="navfieldControls">
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
//import { marked } from 'marked';

const data = {
	title: 'Canada Energy Regulator (CER)',
	linetypes: [
			{ style: 'textStyle', text: 'Corporate Headquarters' },
			{ style: 'textStyle', text: '200 Bay Street<br>Toronto, Ontario<br>M5J 2J2' },
			{ style: 'phoneStyle', phonenumber: '1-800-555-1234', phonetype: 'telLocal' },
			{ style: 'phoneStyle', phonenumber: '1-888-999-8765', phonetype: 'telTollFree' },
			{ style: 'emailStyle', email: 'info@example.com', displayname: 'Customer Support' },
			],
	codeBlock: `<div class="regulatory-info">
<div class="ferc-table">
	<div class="ferc-header">
		<h5 class=" white-heading">{{title}}</h5>
	</div>
			{{linetypes}}
	</div>
</div>`,
};

export default {
	data() {
		return {
			title: data.title,
			linetypes: data.linetypes,
			codeBlock: data.codeBlock,
		};
	},
	methods: {
		updateCode() {
			const linetypeHtml = this.linetypes
					.map((type) => 
						(type.style === 'phoneStyle') ? `<div class="table-cell"><span class="me-1">${type.phonetype}</span> <a class="telephone" href="tel:${type.phonenumber}" target="_blank" rel="noopener">${type.phonenumber}</a></div>` :
						(type.style === 'emailStyle') ? `<div class="table-cell"><a href="mailto:${type.email}" target="_blank" rel="noopener">${type.displayname}</a></div>` : 
						(type.style === 'textStyle') ? `<div class="table-cell">${type.text}</div>` : ''
					)
					.join('\n        ');

			// Properly construct the codeBlock with reactive data properties
			this.codeBlock = data.codeBlock
				.replace('{{title}}', this.title)
				.replace('{{linetypes}}', linetypeHtml);
		},

			// Add a new empty line type entry
			addEntry() {
				this.linetypes.push({style: 'textStyle'});
			},

			// Remove the last line type entry
			removeEntry() {
				this.linetypes.pop();
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
				const item = this.linetypes.splice(index, 1)[0];
				this.linetypes.splice(index - 1, 0, item);
			}
		},
		moveItemDown(index) {
			if (index < this.linetypes.length - 1) {
				const item = this.linetypes.splice(index, 1)[0];
				this.linetypes.splice(index + 1, 0, item);
			}
		},
	},
	watch: {
		title() {
			this.updateCode();
		},
		linetypes: {
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
	.optionStyle{
		display: flex;
	}
	.optionStyle>select{
		flex: 1;
	}
	.inputLine{
		flex:1;
	}
	.inputLine label{
		flex: 1;
		text-wrap: nowrap;
	}
	.ph
	.inputLine>div{
		gap: 1em;
		text-wrap: nowrap;
	}
	.phone,.address,.text{
		display: none;
	}
	.phoneStyle>.phone{
		display: flex;
		gap: 1em;
	}
	.emailStyle>.address{
		display: flex;
		gap: 1em;
	}
	.textStyle>.text{
		display: flex;
		gap: 1em;
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



















