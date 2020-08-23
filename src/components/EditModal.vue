<template>
  <div class="card container container-edit">
    <form class="col s12 card-content">
      <h4>Add Category</h4>
      <div class="row">
        <div class="input-field col s12">
          <label for="post_title">Category</label>
          <input
            placeholder="Add Category"
            id="post_title"
            type="text"
            class="validate"
            ref="catergoryInput"
          />
        </div>
      </div>
      <div class="center-align">
        <a href class="btn btn_position" @click.prevent="addPosts()">Add</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: null,
    };
  },
  methods: {
    addPosts() {
      this.category = this.$refs.catergoryInput.value;
      this.$emit("addtocat", this.category);
    },
  },
};
</script>

<style scoped>
.container-edit {
  width: 40%;
  height: 40vh !important;
}

.input-field > label {
  position: initial;
}
</style>