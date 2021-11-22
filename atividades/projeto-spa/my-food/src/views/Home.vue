<template>
  <div class="home">
    <CategoryMenu />
    <ItemList />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryMenu from '@/components/CategoryMenu.vue'
import ItemList from '@/components/ItemList.vue'

export default {
  name: 'Home',
  components: {
    CategoryMenu,
    ItemList
  }
}
</script>

<style scoped lang="less">
  .home {
    display: flex;
  }
</style>