import axios from "axios";
import { createStore } from "vuex";
// import JSONData from "@/assets/data.json";
export default createStore({
  state: {
    postsSuccessData: null,
    postsSuccessDataLoading: false,
    postsSuccessDataError: null,

    postsChangeDataMessage: null,
    postsChangeDataErrorMessage: null,
  },
  getters: {
    postsSuccessData: (state) => state.postsSuccessData,
    postsSuccessDataLoading: (state) => state.postsSuccessDataLoading,
    postsSuccessDataError: (state) => state.postsSuccessDataError,
    postsChangeDataMessage: (state) => state.postsChangeDataMessage,
    postsChangeDataErrorMessage: (state) => state.postsChangeDataErrorMessage,
  },
  mutations: {
    postsSuccessData: (state) => {
      state.postsSuccessDataLoading = true;
      axios("data.json")
        .then((json) => {
          state.postsSuccessData = json.data;
        })
        .catch(() => {
          state.postsSuccessDataError = "error message";
        })
        .finally(() => {
          state.postsSuccessDataLoading = false;
        });
      // axios
      //   .get("https://jsonplaceholder.typicode.com/posts")
      //   .then((response) => {
      //     if (response.status == 200) {
      //       state.postsSuccessData = response.data;
      //     } else {
      //       state.postsSuccessDataError = "error message";
      //     }
      //   })
      //   .catch(() => {
      //     state.postsSuccessDataError = "error message";
      //   })
      //   .finally(() => {
      //     state.postsSuccessDataLoading = false;
      //   });
    },
    editPostsData: async (state, payload) => {
      let start = state.postsSuccessData.slice(0, payload.id - 1);
      let end = state.postsSuccessData.slice(payload.id);
      state.postsSuccessData = [...start, payload, ...end];
      state.postsChangeDataMessage = true;
    },
    resetEditDataMessage: (state) => {
      state.postsChangeDataMessage = null;
      state.postsChangeDataErrorMessage = null;
    },
  },
  actions: {
    postsSuccessData: ({ commit }) => {
      commit("postsSuccessData");
    },
    editPostsData: ({ commit }, payload) => {
      commit("editPostsData", payload);
    },
    resetEditDataMessage: ({ commit }) => {
      commit("resetEditDataMessage");
    },
  },
  modules: {},
});
