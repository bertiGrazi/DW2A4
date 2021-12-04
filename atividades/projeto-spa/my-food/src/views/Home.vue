<template>
  <div class="home">
    <CategoryMenu />
    <ItemList />
    <Cart v-if="isDesktop()"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryMenu from "@/components/CategoryMenu.vue";
import ItemList from "@/components/ItemList.vue";
import Cart from "@/components/Cart.vue";
import Mixin from '@/mixins/mixins';

export default {
  name: "Home",
  components: {
    CategoryMenu,
    ItemList,
    Cart,
  }, 
  mixins: [Mixin]
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
