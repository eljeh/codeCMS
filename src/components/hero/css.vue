<template>
  <div>
    <form @submit.prevent="updateCode">
      <label>
        hero-mobile 
        <input type="text" v-model="heroMobile" placeholder="heroMobile" style="width: 100%;" />
      </label>
      <label>
        hero-desktop 
        <input type="text" v-model="heroDesktop" placeholder="heroDesktop" style="width: 100%;" />
      </label>
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
  heroMobile : '/siteassets/investors/spinoff/tc-sb-spinpage-hero-mobile.jpg',
  heroDesktop: 'siteassets/investors/spinoff/tc-sb-spinpage-hero.jpg',
  codeBlock: `@charset "utf-8";
/* CSS Document */
/* Remove padding from HTML block
.HtmlBlock {
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-bottom: -5px;
}
h1, .hero-intro h5, .hero-intro p {
  color: #ffffff;
}
h1 {
  line-height: 1.1;
  font-size: 2.5rem;
}
.project-icon {
  width: 46px;
  margin-right: 10px;
}
@media (min-width: 991px) {
  h1 {
    font-size: 2.5rem;
  }
}
.desktop-heading {
  display: none
}
@media (min-width: 991px) {
  .desktop-heading {
    display: block;
  }
  .mobile-heading {
    display: none;
  }
}
.overview-text {
  margin: 0 0 2em;
  color: #fff;
}
.overview-text a {
  color: #fff;
  text-decoration: underline;
}
.overview-text a:hover {
  text-decoration: none;
}


 */
a.blue-nav-item::before {
  background-image: url(/siteassets/brand/graphic-elements/tce-white-arrows.svg);
  background-position: center center;
  background-repeat: no-repeat;
  content: "";
  width: 20px;
  height: 18px;
  margin-top: -8px;
  position: absolute;
  left: 20px;
  top: 31px;
  transition: 0.3s;
}
@media(min-width: 991px) {
a.blue-nav-item::before {
 top: 27px;
}
}
a.blue-nav-item:hover::before {
  left: 23px;
}
.blue-nav {
  margin-bottom: 3em;
}
.overview-text p:first-child {
  margin-top: 0;
}
a.blue-nav-item {
  display: block;
  position: relative;
  color: #fff;
  text-transform: uppercase;
  font-family: "PP Neue Machina Plain";
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 250, 250, .3);
  border-left: 4px solid rgba(255, 250, 250, .3);
  padding: 1.2em 0 0.9em 3em;
  background-color: rgba(13, 100, 239, 0.8);
  transition: background 0.4s ease 0s, color 0.4s ease 0s;
}
a.blue-nav-item:first-child {
  border-top-right-radius: 10px;
}
a.blue-nav-item:last-child {
  border-bottom: none;
  border-bottom-right-radius: 10px;
}
a.blue-nav-item:hover {
  text-decoration: none;
  background-color: #191919;
}
.down-arrow {
  width: 13%;
  margin-top: 2em;
  margin: 1.5em 0 3.5em;
  align-self: center;
}

@media screen and (min-width: 600px) and (max-width: 990px) {
.down-arrow {
  width: 8%;
  }
}

@media (max-height: 800px) {
  .down-arrow {
    margin-bottom: 50px !important;
  }
}
@media (min-width: 991px) {
  .overview {
    display: flex;
    gap: 6em;
  }
  .overview-text {
    width: 65%;
    margin: 0;
  }
  .blue-nav {
    width: 35%;
  }
  .down-arrow {
    width: 4%;
    margin: 2em 0 0;
    align-self: unset;
  }
}
.blue-hr {
  border-top: 4px solid #0D64EF;
  margin: 2em 0 2.5em;
}
/* Hide Header, so we keep header on other languages */
.hero.min {
  display: none;
}
/* Hero header styles */
.hero-header {
  padding: 65px 1em 0;
  background-image: url('{{heroMobile}}');
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, .15);
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: visible;
  position: relative;
  background-position: center;
}
.hero-intro {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
@media (min-width: 991px) {
  .hero-intro {
    width: 1140px;
    padding: 3em 0;
  }
}
@media (min-width: 991px) and (max-width: 1280px) {
  .hero-intro {
    width: 970px;
    padding: 2em 0;
  }
}
.hero-intro p {
  font-size: 1.1rem;
  margin-bottom: 1em;
  font-weight: 500;
}
@media only screen and (min-width: 560px) {
  .hero-header {
    min-height: 90vh;
  }
}
/* Hero header styles desktop*/
@media only screen and (min-width: 991px) {
  .hero-header {
    background-image: url('{{heroDesktop}}');
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, .15);
    padding: 0;
    justify-content: center;
    overflow: visible;
    position: relative;
  }
  h1, .hero-intro p {
    color: #ffffff;
  }
}
/* Parallax FX - desktop only*/
@media only screen and (min-width: 991px) {
  .parallax {
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: 50% 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
/* Retina displays */
@media only screen and (-webkit-min-device-pixel-ratio: 2) and (min-device-width: 2000px), only screen and (min--moz-device-pixel-ratio: 2) and (min-device-width: 2000px), only screen and (-o-min-device-pixel-ratio: 2/1) and (min-device-width: 2000px), only screen and (min-device-pixel-ratio: 2) and (min-device-width: 2000px), only screen and (min-resolution: 192dpi) and (min-device-width: 2000px), only screen and (min-resolution: 2dppx) and (min-device-width: 2000px) {
  .hero-intro {
    margin: auto auto;
    width: 1200px;
  }
  h1 {
    font-size: 4rem;
  }
}
h2, h3, h4 {
  color: #191919;
}

/* lime nav */

a.lime-nav-item::before {
  background-image: url(/siteassets/brand/graphic-elements/tce-blue-arrows.svg);
  background-position: center center;
  background-repeat: no-repeat;
  content: "";
  width: 20px;
  height: 18px;
  margin-top: -8px;
  position: absolute;
  left: 20px;
  top: 31px;
  transition: 0.3s;
}
@media(min-width: 991px) {
a.lime-nav-item::before {
 top: 27px;
}
}
a.lime-nav-item:hover::before {
  left: 23px;
}
.blue-nav {
  margin-bottom: 3em;
}
.overview-text p:first-child {
  margin-top: 0;
}
a.lime-nav-item {
  display: block;
  position: relative;
  color: #191919;
  text-transform: uppercase;
  font-family: "PP Neue Machina Plain";
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 250, 250, .3);
  border-left: 4px solid rgba(255, 250, 250, .3);
  padding: 1.2em 0 0.9em 3em;
  background-color: rgba(193, 245, 14, 0.94);
  transition: background 0.4s ease 0s, color 0.4s ease 0s;
}
a.lime-nav-item:first-child {
  border-top-right-radius: 10px;
}
a.lime-nav-item:last-child {
  border-bottom: none;
  border-bottom-right-radius: 10px;
}
a.lime-nav-item:hover {
  text-decoration: none;
  background-color: #191919;
   color: #fff;
}`,
};

export default {
  data() {
    return {
      heroMobile: hero.heroMobile,
      heroDesktop: hero.heroDesktop,
      codeBlock: hero.codeBlock.trim(),
    };
  },
  methods: {
    updateCode() {

      // Properly construct the codeBlock with reactive data properties
      this.codeBlock = hero.codeBlock
        .replace('{{heroMobile}}', this.heroMobile)
        .replace('{{heroDesktop}}', this.heroDesktop)
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
    heroMobile() {
      this.updateCode();
    },
    heroDesktop() {
      this.updateCode(); 
    },
  },
  mounted() {
    this.updateCode();
  },
};
</script>

<style scoped>
</style>
