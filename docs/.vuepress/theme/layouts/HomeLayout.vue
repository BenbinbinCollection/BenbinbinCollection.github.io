<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <header
      class="flex flex-col justify-center items-center text-white"
      :style="{ 'background-color': color }"
    >
      <Navbar class="w-full"></Navbar>
      <div class="container px-8 py-20">
        <img
          class="mx-auto w-1/2 sm:w-2/5 md:1/3 lg:w-1/4"
          :src="$withBase(`/images/${icon}`)"
          alt="logo"
        />
        <p class="p-8 text-center font-light text-xs md:text-sm lg:text-base" v-html="description"></p>
      </div>
    </header>

    <main class="flex-grow px-8 py-16">
      <div
        v-if="posts.length > 0"
        class="
          container
          mx-auto
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        <button
          v-for="post of posts"
          :key="post.name"
          class="
            post
            rounded-2xl
            pl-6
            relative
            bg-cover bg-center bg-no-repeat
            hover:shadow-lg
            hover:text-blue-400
            text-white
            transition-all
          "
          :style="{
            backgroundImage:
              'url(' + $withBase(`/images/home/${post.image}`) + ')',
          }"
          @click.exact="clickHandler(post.name)"
          @click.ctrl.shift.exact="ctrlShiftClickHandler(post.name)"
        >
          <div class="post-body my-40 relative z-10">
            <h3 class="text-5xl text-left font-bold">{{ post.name }}</h3>
          </div>
        </button>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import { reactive, toRefs, onMounted } from "vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup(props) {
    // data
    const data = reactive({
      author: "",
      title: "",
      icon: "",
      description: "",
      color: "",
      posts: [],
      clickHandler: () => {},
      ctrlShiftClickHandler: () => {},
    });

    onMounted(() => {
      data.clickHandler = (value) => {
        const link = `postslist/${value.toLowerCase()}`;
        window.open(link);
      };

      data.ctrlShiftClickHandler = (value) => {
        const link = `folderslist/${value.toLowerCase()}`;
        window.open(link);
      };
    });

    data.title = __HOME_PAGE_TITLE__ || "Blog";
    data.icon = __HOME_PAGE_ICON__ || "";
    data.description =
      __HOME_DESCRIPTION__ || "A blog and knowledge management system.";
    data.color = __HOME_PAGE_COLOR__ || "#292d31";

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  min-height: calc(100vh * 0.3);
}

.card::after {
  content: "";
  background-color: rgba(0, 0, 0, 0.25);
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 1rem;
}
</style>