<template>
  <div>
    <form @submit.prevent="updateCode">
      <div class="codeControls">
        <button @click="copyToClipboard">Copy</button>
      </div>
    </form>
    <pre><code ref="codeBlock">{{ codeBlock }}</code></pre>
  </div>
</template>

<script>
//import { marked } from 'marked';

const hero = {
  codeBlock: `/* Parallax JS */
if($(window).width() >= 1025){
	$(window).on('load', function() {
	$(".loader").delay(7000).hide();
	$(".hero-header").delay(2000).fadeIn(1)
})

let parallax = document.querySelectorAll(".parallax")
let speed = -0.25
window.onscroll = function() {
	[].slice.call(parallax).forEach(function(el, i) {
		const windowYOffset = window.pageYOffset,
			elBackgrounPos = "50% " +  (windowYOffset * speed + i * 200) + "px"
		el.style.backgroundPosition = elBackgrounPos
	})
}
	}`,
};

export default {
  data() {
    return {
      codeBlock: hero.codeBlock.trim(),
    };
  },
  methods: {
    updateCode() {

      // Properly construct the codeBlock with reactive data properties
      this.codeBlock = hero.codeBlock
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
  },
  mounted() {
    this.updateCode();
  },
};
</script>

<style scoped>
</style>
