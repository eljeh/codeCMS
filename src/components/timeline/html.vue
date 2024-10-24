<template>
	<div>
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
              - Collapse List
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


const data = {
	title: 'Project timeline',
	footnote: 'NOTE: Dates are subject to change.',
	lineitems: [
  {
    "goal": "Project kickoff meeting",
    "status": "Q3 2025",
    "shaded": true
  },
  {
    "goal": "Expected submission of environmental impact assessment to the National Environmental Board (NEB)",
    "status": "Q4 2025",
    "shaded": false
  },
  {
    "goal": "Planned filing of Section 301 permit application with the NEB",
    "status": "Q1 2026",
    "shaded": true
  },
  {
    "goal": "Preliminary site preparation",
    "status": "Q4 2026",
    "shaded": false
  },
  {
    "goal": "Anticipated commencement of main construction phase",
    "status": "Q4 2027",
    "shaded": true
  },
  {
    "goal": "Projected operational launch date",
    "status": "Q2 2028",
    "shaded": false
  }
],
	codeBlock: `<h2 id="time-line" class="mb-2">{{title}}</h2>
	<div class="row timeline mx-0 mb-2">
		{{lineitems}}
	</div>
<p class="small">{{footnote}}</p>`,
};

export default {
	data() {
		return {
			title: data.title,
			lineitems: data.lineitems, 
			footnote: data.footnote, 
			codeBlock: data.codeBlock,
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
			this.codeBlock = data.codeBlock
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
			this.selectAll();
			document.execCommand('copy');
			alert('Code copied to clipboard!');
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