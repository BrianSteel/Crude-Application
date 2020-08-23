<template>
  <div class="card container">
    <form class="col s12 card-content">
      <h3>Add To Posts</h3>
      <div class="row">
        <div class="input-field col s12">
          <label for="post_title">Title</label>
          <!-- Input for add -->
          <input
            placeholder="Title"
            id="post_title"
            type="text"
            class="validate"
            ref="input"
          />
        </div>
        <div class="input-field col s12">
          <label for="textarea1">Details</label>
          <!-- textarea for add -->
          <textarea
            placeholder="Details"
            id="textarea1"
            class="materialize-textarea"
            ref="textarea"
          ></textarea>
        </div>
        <!-- Category list for add -->
        <div class="col s12">
          <div class="selectBox" @click="isExpanded=!isExpanded">
            <select name>
              <option value>Choose Category</option>
            </select>
            <div class="options"></div>
          </div>
          <div class="showCheckboxes" v-if="isExpanded">
            <label @click="modalEdit=true" class="grey lighten-3 selectLabel" for>Add Category</label>

            <div v-if="categories">
              <div v-for="(category, ind) in categories" :key="ind">
                <label class="selectLabel">
                  <input
                    type="checkBox"
                    value="{{category}}"
                    v-on:change="addCategory(category, $event)"
                    checked
                  />
                  {{category}}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-align">
        <a href class="btn btn_position" @click.prevent="addPosts()">Add</a>
      </div>
    </form>

    <!-- Modal for add -->
    <div v-if="modalEdit">
      <transition name="modal">
        <div class="modal-cover">
          <div class="modal-align">
            <a href class="cross" @click.prevent="modalEdit = false">
              <i class="material-icons">close</i>
            </a>
            <editModal v-on:addtocat="addtoCat($event)" />
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>


<script>
import EditModal from "@/components/EditModal";

export default {
  name: "AddModal",
  components: {
    EditModal,
  },
  data() {
    return {
      isExpanded: false,
      modalEdit: false,
      post: {},
      categories: [],
      arr: [],
    };
  },
  methods: {
    addPosts() {
      this.post["title"] = this.$refs.input.value;
      this.post["body"] = this.$refs.textarea.value;

      this.$emit("addtoposts", this.post);
    },
    addCategory: function (value, event) {
      if (event === true) {
       this.arr.push(value);
        this.post["categories"] = this.arr;
        event = false;
      } else if (event.target) {
        if (event.target.checked) {
          this.arr.push(value);
          this.post["categories"] = this.arr;
        } else {
          this.arr = this.arr.filter((val, ind) => {
            return this.arr[ind] != value;
          });
          this.post["categories"] = this.arr;
        }
      }
    },
    addtoCat: function (updateCats) {
      if(updateCats==""){
        this.modalEdit = false;
        return; 
      }
      this.categories.push(updateCats);
      this.modalEdit = false;
      this.enteredCat = true;
      this.addCategory(updateCats, true);
    },
  },

};
</script>

<style scoped>

.container {
  height: 90vh;
}

.input-field > label {
  position: initial;
}

.cross {
  position: relative;
  top: 2rem;
  left: 39.4rem;
  z-index: 10;
}

select {
  display: initial;
}

.btn_position {
  margin: 8rem 0;
}

[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: initial;
  opacity: 1;
  pointer-events: initial;
}

input[type="checkbox"]:checked {
  background: #7a8beb !important;
}

.selectLabel {
  margin: 6px;
  font-size: 1rem;
  padding: 5px 1rem;
}

select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
}

/* For IE10 */
select::-ms-expand {
  display: none;
}

.selectLabel input {
  margin-right: 6px;
}

.selectBox {
  position: relative;
}

.options {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.showCheckboxes {
  position: absolute;
  width: 92%;
  display: block;
  border: 1px solid #dadada;
  z-index: 20;
}

.showCheckboxes label {
  display: block;
}

.showCheckboxes label:hover {
  background: #eee;
}

.modal-cover {
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  left: 50%;
  transform: translateX(-50%);
}

.modal-align {
  display: flex;
  justify-content: center;
  position: relative;
  top: 20%;
}
</style>