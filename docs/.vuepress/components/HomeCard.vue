<template>
  <div class="card flex flex-col">
    <div class="card-main flex-grow flex flex-col space-y-4">
      <a :href="$withBase(post.pathRelative)" target="_blank">
        <div
          v-if="post.cover"
          class="card-cover h-40 bg-top bg-no-repeat bg-cover rounded"
          :style="{
            backgroundImage:
              'url(' + $withBase(`/images/covers/${post.cover}`) + ')',
          }"
        ></div>
        <div
          v-if="!post.cover"
          class="card-cover h-40 bg-center bg-no-repeat bg-cover rounded"
          :style="{
            backgroundImage:
              'url(' + $withBase('/images/covers/collection.png') + ')',
          }"
        ></div>
      </a>
      <div class="card-header flex flex-col space-y-2">
        <a
          v-if="post.folder"
          class="font-bold text-blue-400 hover:text-blue-500"
          :href="$withBase(`/postslist/${post.folder}`)"
        >
          {{ post.folder }}
        </a>
        <a
          :href="$withBase(post.pathRelative)"
          target="_blank"
          class="text-2xl font-bold hover:text-blue-500"
        >
          {{ post.title }}
        </a>

        <div
          v-if="createdTime || updatedTime"
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
          <span v-if="createdTime" class="text-xs">{{ createdTime }}</span>
          <span v-if="createdTime && updatedTime"> - </span>
          <span v-if="updatedTime" class="text-xs"
            >Update {{ updatedTime }}</span
          >
        </div>
      </div>
      <div class="card-body">
        <p>{{ post.summary }}</p>
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
        v-for="tag of post.tags"
        :key="tag"
        class="
          flex-shrink-0
          text-gray-400
          font-bold
          text-xs
          hover:text-blue-500
        "
        :href="$withBase(`/postslist/${post.folder}#${tag}`)"
        >#{{ tag }}</a
      >
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import formatTime from "../utils/formatTime";

export default {
  props: ["post"],
  setup({ post }) {
    const data = reactive({
      createdTime: null,
      updatedTime: null,
    });
    if (post.date) {
      data.createdTime = formatTime(post.date);
    } else if (post.createdTime) {
      data.createdTime = formatTime(post.createdTime);
    }
    if (post.updatedTime) {
      data.updatedTime = formatTime(post.updatedTime);
    }

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #4b5563;
}

.tags {
  overflow: overlay;
}
</style>