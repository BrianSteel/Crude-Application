<template>
  <div id="singlePost" class="container">
    <h1>{{title}}</h1>
    <article >{{body}}</article>
    <h4>List of Categories</h4>
    <ul v-for="(category, index) in categories" :key="index">
      <li>
        {{category}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
  name: "singlePost",
  props: {
    title: String,
    body: String,
    categories: Array
  },
  created(){
    console.log(this.categories)
  }
};
</script>

<style scoped>
li{
  display: block!important;
}
</style>