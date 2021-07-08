<template>
  <div class="min-h-screen flex flex-col">
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
        <p
          class="p-8 text-center font-light text-xs md:text-sm lg:text-base"
          v-html="description"
        ></p>
      </div>
    </header>

    <main class="container mx-auto flex-grow px-8 md:px-16 py-16 space-y-8">
      <div
        v-if="latestPosts.length > 0"
        class="first-card w-full grid grid-cols-3 gap-8"
      >
        <a
          class="col-span-2"
          :href="$withBase(latestPosts[0].pathRelative)"
          target="_blank"
        >
          <div
            v-if="latestPosts[0].cover"
            class="card-cover bg-top bg-no-repeat bg-cover rounded"
            :style="{
              backgroundImage:
                'url(' +
                $withBase(`/images/covers/${latestPosts[0].cover}`) +
                ')',
            }"
          ></div>
          <div
            v-if="!latestPosts[0].cover"
            class="card-cover bg-center bg-no-repeat bg-cover rounded"
            :style="{
              backgroundImage:
                'url(' + $withBase('/images/covers/collection.png') + ')',
            }"
          ></div>
        </a>

        <div class="col-span-1 flex flex-col justify-between">
          <div class="card-main space-y-4">
            <div class="card-header flex flex-col space-y-2">
              <a
                v-if="latestPosts[0].folder"
                class="font-bold text-blue-400 hover:text-blue-500"
                :href="$withBase(`/postslist/${latestPosts[0].folder}`)"
              >
                {{ latestPosts[0].folder }}
              </a>
              <a
                :href="$withBase(latestPosts[0].pathRelative)"
                target="_blank"
                class="text-3xl font-bold hover:text-blue-500"
              >
                {{ latestPosts[0].title }}
              </a>
              <div
                v-if="
                  latestPosts[0].date ||
                  latestPosts[0].createdTime ||
                  latestPosts[0].updatedTime
                "
                class="flex items-center text-gray-400 space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                  />
                  <path
                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
                  />
                </svg>
                <span
                  v-if="latestPosts[0].date || latestPosts[0].createdTime"
                  class="text-xs"
                  >{{ getCreatedTime(latestPosts[0]) }}</span
                >
                <span
                  v-if="
                    (latestPosts[0].date || latestPosts[0].createdTime) &&
                    latestPosts[0].updatedTime
                  "
                >
                  -
                </span>
                <span v-if="latestPosts[0].updatedTime" class="text-xs"
                  >Update {{ formatTime(latestPosts[0].updatedTime) }}</span
                >
              </div>
            </div>
            <div v-if="latestPosts[0].summary" class="card-body">
              <p>{{ latestPosts[0].summary }}</p>
            </div>
          </div>
          <div
            class="
              card-footer
              tags
              py-4
              flex flex-nowrap
              items-center
              overflow-x-auto
              space-x-1
            "
          >
            <a
              v-for="tag of latestPosts[0].tags"
              :key="tag"
              class="flex-shrink-0 text-gray-400 text-xs hover:text-blue-500"
              :href="$withBase(`/postslist/${latestPosts[0].folder}#${tag}`)"
              >#{{ tag }}</a
            >
          </div>
        </div>
      </div>
      <hr class="border-gray-200"/>
      <div
        v-if="latestPosts.length > 1"
        class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 divide-y divide-gray-200"
      >
        <home-card
          v-for="post of latestPosts.slice(1)"
          :key="post.key"
          :post="post"
          @setCollection="setCollectionHandler"
        ></home-card>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import HomeCard from "../../components/HomeCard.vue";
import { reactive, toRefs, onMounted } from "vue";
import { usePageData } from "@vuepress/client";
import formatTime from "../../utils/formatTime";

export default {
  components: {
    Navbar,
    Footer,
    HomeCard,
  },
  setup(props) {
    // data
    const data = reactive({
      author: "",
      title: "",
      icon: "",
      description: "",
      color: "",
      latestPosts: [],
      clickHandler: () => {},
      ctrlShiftClickHandler: () => {},
    });

    // method
    const getCreatedTime = (post) => {
      const time = post.date || post.createdTime;
      if (time) {
        return formatTime(time);
      } else {
        return "";
      }
    };

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
    const page = usePageData();
    data.latestPosts = page.value.latestPosts;
    const refData = toRefs(data);
    return {
      ...refData,
      formatTime,
      getCreatedTime,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  min-height: calc(100vh * 0.3);
}

.tags {
  overflow: overlay;
}

.first-card {
  .card-cover {
    min-height: 15rem;
  }
}
</style>