<template>
	<div>
		<form @submit.prevent="updateCode">
			<!-- Input field for Title -->
			<label>
				Title:
				<input type="text" v-model="title" placeholder="Title" style="width: 100%;" />
			</label>
			
			<!-- Textarea for Description -->
			<label>
				Description:
				<textarea v-model="description" placeholder="Description" style="width: 100%; height: 10ch"></textarea>
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
	const data = {
		title: 'Contact Information',
		description: 'Safety is our top priority for all our pipelines and facilities. For emergency situations, please refer to our <a href="/emergency-contacts" target="_blank" rel="noopener">Emergency Contact page</a> for a comprehensive list of emergency numbers.',
		linetypes: [
			{ style: 'textStyle', text: 'Corporate Headquarters' },
			{ style: 'textStyle', text: '200 Bay Street<br>Toronto, Ontario<br>M5J 2J2' },
			{ style: 'phoneStyle', phonenumber: '1-800-555-1234', phonetype: 'telLocal' },
			{ style: 'phoneStyle', phonenumber: '1-888-999-8765', phonetype: 'telTollFree' },
			{ style: 'emailStyle', email: 'info@example.com', displayname: 'Customer Support' },
		],
		codeBlock: `<div class="ferc-table mb-2">
			<div class="ferc-header">
				<h5 class="white-heading">{{title}}</h5>
			</div>
			<div class="table-cell">{{description}}</div>
			{{linetypes}}
		</div>`,
	};

	export default {
		data() {
			return {
				title: data.title,
				description: data.description,
				linetypes: data.linetypes,
				codeBlock: data.codeBlock,
			};
		},
		methods: {
			// Update codeBlock dynamically based on form inputs
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
					.replace('{{description}}', this.description)
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

			// Select the entire code block for copying
			selectAll() {
				const codeElement = this.$refs.codeBlock;
				const range = document.createRange();
				range.selectNodeContents(codeElement);
				const selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
			},

			// Copy the code to clipboard
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

		// Watch for changes to form inputs and update the codeBlock dynamically
		watch: {
			title() {
				this.updateCode();
			},
			description() {
				this.updateCode(); 
			},
			linetypes: {
				handler() {
					this.updateCode();
				},
				deep: true,
			},
		},

		// Initialize the codeBlock when component is mounted
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





















