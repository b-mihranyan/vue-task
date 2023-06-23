<template>
  <div class="home-container">
    <div v-if="!postsLoading" class="px-12 py-12">
      <div class="d-flex justify-space-between align-center pb-4">
        <div>
          {{ (currentPage - 1) * perpage + 1 }} to
          {{ currentPage * perpage }} of {{ postsSuccessData?.length }} posts
        </div>
      </div>
      <div class="posts-container">
        <template v-for="(post, i) in postsSuccessData">
          <PostCard
            v-if="
              post.id > (currentPage - 1) * perpage &&
              post.id <= currentPage * perpage
            "
            :key="`post_${i}`"
            :data="post"
            @edit-post="onEditPost"
          />
        </template>
      </div>
      <div class="text-center pagination">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(postsSuccessData?.length / perpage)"
        ></v-pagination>
      </div>
    </div>
    <div
      style="height: 100vh"
      class="d-flex justify-center align-center"
      v-else
    >
      <v-progress-circular indeterminate color="primary" size="32" />
    </div>
    <v-snackbar v-model="showEditSnackBar" :timeout="2800" color="green">
      Post Edited!
    </v-snackbar>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

import PostCard from "@/components/PostCard.vue";
const store = useStore();
const currentPage = ref(1);
const perpage = ref(6);
const showEditSnackBar = computed(() => {
  return store.getters.postsChangeDataMessage;
});
const postsSuccessData = computed(() => store.getters.postsSuccessData);
const postsLoading = computed(() => store.getters.postsSuccessDataLoading);
const postsError = computed(() => statusbar.getters.postsSuccessDataError);

function onEditPost(payloadData) {
  store.dispatch("editPostsData", payloadData.value);
}

watch(currentPage, () => {
  document.getElementsByClassName("home-container")[0].scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

watch(showEditSnackBar, () => {
  if (showEditSnackBar.value) {
    setTimeout(() => {
      store.commit("resetEditDataMessage");
    }, 2000);
  }
});
onMounted(() => {
  store.commit("postsSuccessData");
  console.log("postsError", postsError);
});
</script>

<style scoped lang="scss">
.posts-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 45px;
}
::v-deep {
  .v-snack__content {
    text-align: center;
  }
}
.pagination{
  margin-top: 72px !important;
}
</style>
