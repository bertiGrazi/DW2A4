<template>
  <div class="item-list">
      hello
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ItemList',    
    created() {
    axios.get('http://localhost:3000/burguers').then(response => {
      console.log(response);
    })
  }
}
</script>

<style>

</style>