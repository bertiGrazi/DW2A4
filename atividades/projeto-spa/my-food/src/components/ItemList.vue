<template>
  <div class="items-list">
    <Loading v-if="isLoading" />
    <Item v-for="item in itemsList" :key="item.id" :item="item" />
  </div>
</template>

<script>
import axios from "axios";
import Item from "./Item.vue";
import Loading from "./Loading.vue";

export default {
  name: "ItemList",
  components: {
    Item,
    Loading,
  },
  data() {
    return {
      itemsList: [],
      isLoading: false,
    };
  },
  created() {
    this.getItemsList();
  },
  computed: {
    seletectedCategory() {
     return this.$store.state.seletectedCategory;
    },
  },
  methods: {
    getItemsList() {
      this.isLoading = true;
      this.itemsList = [];


      setTimeout(() => {
        axios
          .get(`http://localhost:3000/${this.seletectedCategory}`)
          .then((response) => {
            this.itemsList = response.data;
            this.isLoading = false;
          });
      }, 500);
    },
  },
  watch: {
    seletectedCategory() {
      this.getItemsList();
    },
  },
};
</script>
<style lang="less" scoped>
.items-list {
  margin: 50px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;

  @media @smartphones {
    flex-wrap: wrap;
    margin: 0px;
    padding: 20px;
  }
}
</style>
