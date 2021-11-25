<template>
  <div class="item">
    <div class="container">
      <div class="item--tag" v-if="item.offer">Ofertas</div>
      <img class="item--img" :src="imagePath" alt="" />
    </div>

    <div class="content">
      <h2 class="item--name">{{ item.name }}</h2>
      <p class="item--description">{{ item.description }}</p>
      <p class="item--price">{{ item.price | currency }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  props: {
    /*Recebe info do item pai */
    item: {},
  },
  computed: {
    seletectedCategory() {
      return this.$store.state.seletectedCategory;
    },
    imagePath() {
      return require(`../assets/images/${this.seletectedCategory}/${this.item.id}.png`);
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  width: 215.95px;
  height: 290px;
  border-radius: 8px;
  background: white;
  position: relative;
  margin: 20px;
  padding: 20px;

  &--img {
    display: block;
    margin: auto;
    width: 90%;
  }
  &--tag {
    position: absolute;
    background: @pink;
    border-radius: 8px;
    color: white;
    top: 15px;
    right: 15px;
    font-weight: 500;
    font-size: 12px;
    padding: 3px 8px;
  }

  &--name {
    font-weight: 600;
    font-size: 18px;
    margin: 8px auto;
  }

  &--description {
    color: @dark-grey;
    font-weight: 300;
    font-size: 12px;
    margin: 0;
  }

  &--price {
    color: @yellow;
    font-weight: 600;
    font-size: 18px;
    margin: 8px auto;
  }

  @media @smartphones {
    width: 100%;
    height: fit-content;
    border: 1px solid @light-grey;
    display: flex;
    margin-right: 15px;
    padding: 5px 10px;

    &--img {
      height: 80px;
      order: 0;
      margin: 0 0 10px 0;
    }

    &--price {
      text-align: right;
      margin: 0 auto;
    }

    &--tag {
      position: static;
      order: 1;
      width: fit-content;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
  }
}
</style>
