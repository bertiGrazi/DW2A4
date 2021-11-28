<template>
  <div class="home">
    <CategoryMenu />
    <ItemList />
    <Cart />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryMenu from "@/components/CategoryMenu.vue";
import ItemList from "@/components/ItemList.vue";
import Cart from "@/components/Cart.vue";

export default {
  name: "Home",
  components: {
    CategoryMenu,
    ItemList,
    Cart
  },
};
</script>

<style scoped lang="less">
.home {
  display: flex;

  @media @smartphones {
    flex-direction: column;
    
  }
}
</style>
