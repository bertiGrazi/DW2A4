<template>
  <div class="add-cart">
    <router-link to="/" class="add-cart--go-back">←️ Voltar</router-link>
    <Item :item="item" class="add-cart--item" />
    <div class="add-cart--container">
      <span>Quantidade</span>
      <Quantity :item="item" :useStore="false" />
    </div>
    <div>
      <p class="add-cart--observations">Observações</p>
      <textarea v-model="item.observations" rows="2"></textarea>
      <button class="primary-button" @click="onAddToCartButtonClick">
        Adiconar ao carrinho
      </button>
    </div>
  </div>
</template>

<script>
import Mixin from "@/mixins/mixins";
import axios from "axios";
import Item from "./Item.vue";
import Quantity from "./Quantity.vue";

export default {
  props: ["id"],
  mixins: [Mixin],
  components: {
    Item,
    Quantity,
  },
  data() {
    return {
      item: {},
    };
  },
  computed: {
    seletectedCategory() {
      return this.$store.state.seletectedCategory;
    },
  },
  created() {
    if(this.isDesktop()) {
      this.$router.push({name: 'Home'});
    }
    axios
      .get(`http://localhost:3000/${this.seletectedCategory}/${this.id}`)
      .then((response) => {
        this.item = { quantity: 1, observations: "", ...response.data };
      });
  },
  methods: {
    onAddToCartButtonClick() {
      this.$store.dispatch("addToCart", this.item);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
<style lang="less">
.add-cart {
  max-width: 600px;
  margin: auto;
  padding: 50px 20px;

  &--go-back {
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    color: black;
    padding: 50px 20px;
  }

  &--item {
    margin-top: 50px;
  }

  &--container {
    display: flex;
    border: 1px solid @light-grey;
    padding: 10px 20px;
    border-radius: 8px;
    margin: 20px 0;

    span {
      margin-right: auto;
      font-weight: 600;
      font-size: 18px;
    }
  }

  &--observations {
    font-weight: 600;
    font-size: 18px;
  }

  textarea {
    width: 100%;
    border-radius: 8px;
    border: 1px solid @light-grey;
  }

  .primary-button {
    width: calc(100% - 40px);
    max-width: 300px;
    margin: 30px auto;
    display: block;
  }

  @media @smartphones {
    button {
      position: fixed;
      bottom: 30px;
      width: calc(100% - 40px);
      max-width: unset;
    }
  }
}
</style>
