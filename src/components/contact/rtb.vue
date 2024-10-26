<template>
	<div class="wrapper">
		<div class="controls">
			<input type="file" @change="handleFileUpload" accept=".json">
			<button @click="downloadData">Download</button>
		</div>
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
          			Collapse List
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
import data from './data.json';

export default {
	data() {
		return {
			title: data.rtb.title,
			description: data.rtb.description,
			linetypes: data.rtb.linetypes,
			codeBlock: data.rtb.codeBlock,
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
			this.codeBlock = data.rtb.codeBlock
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
	downloadData() {
      const jsonData = JSON.stringify({
        rtb: {
          title: this.title,
          description: this.description,
          linetypes: this.linetypes,
          codeBlock: this.codeBlock
        }
      }, null, 2);

      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
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
            this.title = uploadedData.rtb.title;
            this.description = uploadedData.rtb.description;
            this.linetypes = uploadedData.rtb.linetypes;
            this.codeBlock = uploadedData.rtb.codeBlock;
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





















