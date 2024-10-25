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
      <div>
        <strong>Navigation Buttons</strong>
        <label for="expandButtons" class="expandList">
            - Expand List
        </label>
        <input name="expandButtons" class="expand" type="checkbox" checked/>
        <div class="sideNavButtons" >
          <div class="navButton" v-for="(link, index) in links" :key="index">

            <span>{{ index + 1 }}:</span>
            <label class="buttonLabel">
              Label:
              <input type="text" v-model="link.label" placeholder="Link Label" style="width: 100%;" />
            </label>
            <label class="buttonUrl">
              URL:
              <input type="text" v-model="link.url" placeholder="Link URL" style="width: 100%;" />
            </label>

            <div class="buttonOptions">
              <label class="optionStyle">
                Style:
                <select v-model="link.style" >
                  <option value="blue-nav-item">Blue</option>
                  <option value="lime-nav-item">Accent</option>
                </select>
              </label>
              <label class="optionExternal">
                External:
                <input type="checkbox" v-model="link.external" />
            </label>
            </div>

          </div>
        </div>
        <div class="navfieldControls">
            <button @click.prevent="addLink">+ New Link</button>
            <button @click.prevent="removeLink">- Last Link</button>
          </div>
      </div>
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
  links: [
    { label: 'Link 1', url: '#', style: 'lime-nav-item', external: true },
    { label: 'Link 2', url: '#', style: 'blue-nav-item', external: false },
    { label: 'Link 3', url: '#', style: 'blue-nav-item', external: false },
    { label: 'Link 4', url: '#', style: 'blue-nav-item', external: true },
  ],
  codeBlock: `<section class="hero-header parallax" style="background-position: 50% 0px;">
  <div class="hero-intro">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-lg-12 px-0 mb-1 mb-lg-0">
          <h1>{{title}}</h1>
        </div>
      </div>
    </div>
    <hr class="blue-hr">
    <div class="overview">
      <div class="overview-text">
        {{description}}
      </div>
      <div class="blue-nav">
        {{links}}
      </div>
    </div>
  </div>
</section>`,
};

export default {
  data() {
    return {
      title: data.title,
      description: data.description,
      links: data.links,
      codeBlock: data.codeBlock.trim(),
    };
  },
  methods: {
    updateCode() {
      // Construct the links part dynamically
      const linksHtml = this.links
        .map((link) => `<a class="${link.style}" href="${link.url}"${link.external ? ' target="_blank"' : ''}>${link.label}</a>`)
        .join('\n        ');

      // Properly construct the codeBlock with reactive data properties
      this.codeBlock = data.codeBlock
        .replace('{{title}}', this.title)
        .replace('{{description}}', this.description)
        .replace('{{links}}', linksHtml);
    },
    addLink() {
      this.links.push({ label: '', url: '', style: 'blue-nav-item', external: false });
    },
    removeLink() {
      this.links.pop();
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
    links: {
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

<style scoped>
    /* form{
          position: relative;
    }
    .sideNavButtons{

    }
    .navButton{
      display: flex;
      gap: 1rem;
      border-bottom: 1px solid white;
      margin: 0;
      padding: 0.5em 0;
    }

    .buttonLabel{
      flex: 1 0 auto;
    }
    .buttonUrl{
      flex: 1 0 auto;
    }
    .buttonOptions {
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: end;
    }

    button {
      margin-top: 0;
      font-size: 0.75em;
      margin-right: 10px;
      padding: 0.25em 0.75em;
    }

    .codeControls {
      position: absolute;
      margin: 0.5em;
    }
    pre {
      padding-top: 3em;
    }
    .expand:checked ~ .sideNavButtons > .navButton:not(:last-child){
      display: none;
    }
    .navfieldControls{
      padding: 0.5em;
      background: rgb(48, 48, 48);
      margin-bottom: 1em;
    } */
</style>
