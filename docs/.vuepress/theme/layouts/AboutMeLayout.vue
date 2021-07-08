<template>
  <div class="min-h-screen flex flex-col">
    <Navbar class="w-full"></Navbar>
    <div class="about-me container mx-auto flex-grow px-8 md:px-16 py-16">
      <Content />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";

console.log("about me");

export default {
  components: {
    Navbar,
    Footer,
  },
  // setup(props) {
  //   // data
  //   const data = reactive({});

  //   const refData = toRefs(data);
  //   return {
  //     ...refData,
  //   };
  // },
};
</script>

<style lang="scss">
.about-me {
  h1 {
    text-align: center;
    padding-bottom: 3rem;
    font-size: 3rem;
    font-weight: bold;
    border: none;
  }

  h2 {
    padding-bottom: 2rem;
    font-size: 2rem;
    font-weight: bold;
    border: none;
  }

  h3 {
    padding-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  h4,
  h5,
  h6 {
    padding-bottom: 1.2rem;
    font-size: 1.2rem;
    font-weight: bold;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre {
    margin: 15px 0;
  }

  li {
    margin-left: 30px;
  }

  ol li {
    list-style: decimal;
  }

  ul li {
    list-style: circle;
  }

  & > ul > li {
    list-style: disc;
  }

  & > ul > li > ul > li > ul > li {
    list-style: square;
  }

  img {
    margin: 1rem auto;
  }

  a:not(.header-anchor) {
    box-shadow: inset 0 -0.2em 0 blue;
    &:hover {
      text-decoration: none;
      box-shadow: inset 0 -0.6em 0 rgba(0, 0, 255, 0.5);
    }
  }

  .katex-display {
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>