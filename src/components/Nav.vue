<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-1">
      <div class="nav-content">
        <router-link :to="{ name: 'overview' }">
          <span class="nav-title app-title">CRUD APP</span>
        </router-link>

      </div>
    </nav>
    
  </div>
</template>

<script>


export default {
  name: "Nav",
  data() {
    return {
      modal: false,
    };
  },
};
</script>

<style>
.app-title {
  font-size: 3rem !important;
  margin: 0 10rem;
  color: #eee;
}


</style>