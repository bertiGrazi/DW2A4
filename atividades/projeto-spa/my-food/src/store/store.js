import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    seletectedCategory: ''
  },
  mutations: {
    changeCategory(state, id) {
     state.seletectedCategory = id;
    },
  },
  actions: {
    changeCategory(context, id) {
      context.commit('changeCategory', id);
    },
  },
});
