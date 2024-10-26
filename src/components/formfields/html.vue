<template>
  <div>
    <form @submit.prevent="updateCode">
      <!-- Title Input -->
      <TextInput
        label="Title"
        v-model="title"
        placeholder="Title"
        style="width: 100%;"
      />

      <!-- Description Textarea -->
      <TextAreaInput
        label="Description"
        v-model="description"
        placeholder="Description"
        style="width: 100%; height: 10ch"
      />

      <!-- Navigation Buttons Section -->
      <div>
        <strong>Navigation Buttons</strong>

        <!-- Expand Checkbox -->
        <CheckboxInput
          id="expandButtons"
          label="- Expand List"
          v-model="expandButtons"
          class="expandList"
        />

        <!-- Navigation Links -->
        <div class="sideNavButtons">
          <NavigationLink
            v-for="(link, index) in links"
            :key="index"
            :index="index"
            :link="link"
            @update-link="updateLink(index, $event)"
            @remove-link="removeLink(index)"
          />
        </div>

        <!-- Controls to Add/Remove Links -->
        <div class="navfieldControls">
          <button @click.prevent="addLink">+ New Link</button>
          <button @click.prevent="removeLastLink">- Last Link</button>
        </div>
      </div>

    </form>

    <!-- Copy to Clipboard Button -->
    <div class="codeControls">
      <button @click="copyToClipboard">Copy</button>
    </div>

    <!-- Display Code Block -->
    <pre><code ref="codeBlock">{{ codeBlock }}</code></pre>
  </div>
</template>

<script>
// Import Sub-Components
import TextInput from '../formfields/TextInput.vue';
import TextAreaInput from '../formfields/TextAreaInput.vue';
import CheckboxInput from '../formfields/CheckboxInput.vue';
import SelectInput from '../formfields/SelectInput.vue';
import NavigationLink from '../formfields/NavigationLink.vue';

const heroTemplate = `<section class="hero-header parallax" style="background-position: 50% 0px;">
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
</section>`;

export default {
  components: {
    TextInput,
    TextAreaInput,
    CheckboxInput,
    SelectInput,
    NavigationLink,
  },
  data() {
    return {
      title: 'title',
      description: 'description',
      expandButtons: true,
      links: [
        { label: 'Link 1', url: '#', style: 'lime-nav-item', external: true },
        { label: 'Link 2', url: '#', style: 'blue-nav-item', external: false },
        { label: 'Link 3', url: '#', style: 'blue-nav-item', external: false },
        { label: 'Link 4', url: '#', style: 'blue-nav-item', external: true },
      ],
      codeBlock: heroTemplate.trim(),
      heroTemplate, // Keep the original template for replacements
    };
  },
  methods: {
    updateCode() {
      // Construct the links part dynamically
      const linksHtml = this.links
        .map(
          (link) =>
            `<a class="${link.style}" href="${link.url}"${
              link.external ? ' target="_blank"' : ''
            }>${link.label}</a>`
        )
        .join('\n        ');

      // Properly construct the codeBlock with reactive data properties
      this.codeBlock = this.heroTemplate
        .replace('{{title}}', this.title)
        .replace('{{description}}', this.description)
        .replace('{{links}}', linksHtml)
        ;
    },
    addLink() {
      this.links.push({
        label: '',
        url: '',
        style: 'blue-nav-item',
        external: false,
      });
      this.updateCode();
    },
    removeLastLink() {
      this.links.pop();
      this.updateCode();
    },
    updateLink(index, updatedLink) {
      this.$set(this.links, index, updatedLink);
      this.updateCode();
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
      try {
        document.execCommand('copy');
        alert('Code copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
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
/* You can move your existing styles here or keep them in separate CSS files */

/* Example styles */
/* .sideNavButtons {
  margin-top: 1em;
}

.navfieldControls {
  padding: 0.5em;
  background: rgb(48, 48, 48);
  margin-bottom: 1em;
}

.codeControls {
  margin-top: 1em;
}

pre {
  padding-top: 3em;
  background: #f5f5f5;
  padding: 1em;
  overflow: auto;
} */
</style>
