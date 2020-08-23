<template>
  <div class="card container">
    <form class="col s12 card-content">
      <h3>Edit Your Post</h3>
      <div class="row">
        <div class="input-field col s12">
          <label for="post_title">Title</label>
          <!-- Input for edit -->
          <input
            placeholder="Title"
            :value="title"
            id="post_title"
            type="text"
            class="validate"
            ref="input1"
          />
        </div>
        <div class="input-field col s12">
          <label for="textarea1">Details</label>
          <!-- textarea for edit -->
          <textarea
            :value="detail"
            placeholder="Details"
            id="textarea1"
            class="materialize-textarea"
            ref="textarea1"
          ></textarea>
        </div>

        <!-- Category list for edit (THIS IS THE MULTI SELECT PANEL) -->
        <div class="col s12">
          <div class="selectBox" @click="isExpanded=!isExpanded">
            <select name>
              <option value>Choose Category</option>
            </select>
            <div class="options"></div>
          </div>

          <!-- THIS IS THE CHECK BOX PANEL DYNAMIC -->
          <div class="showCheckboxes" v-if="isExpanded">
            <!-- EVENT ATTACHED LABEL OPTION -->
            <label @click="modalEdit=true" class="grey lighten-3 selectLabel" for>Edit Category</label>

            <!-- DIV FOR LOOPING OVER CATEGORIES -->
            <div v-for="(cat, ind) in editCats" :key="ind">
              <label class="selectLabel">
                <input type="checkBox" @click="show(cat, $event, ind)" :checked="cat.checked" />
                {{cat.catName}}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="center-align">
        <a href class="btn btn_position" @click.prevent="editPosts()">Edit</a>
      </div>
    </form>

    <!-- Modal for edit -->
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
  name: "EditMode",
  components: {
    EditModal,
  },
  props: {
    id: Number,
    title: String,
    detail: String,
    cats: Array,
  },
  data() {
    return {
      isExpanded: false, //needed for multiselect
      modalEdit: false, //needed for modal
      editPost: {}, //obj send back to main vue
      editCats: this.cats, //variable takes da array displayed on DOM
      checkedNames: this.cats, //secondary value to change. add to obj
    };
  },
  methods: {
    editPosts() {
      this.editPost["title"] = this.$refs.input1.value;
      this.editPost["body"] = this.$refs.textarea1.value;
      this.editPost["id"] = this.id;
      this.editPost["categories"] = this.checkedNames.map((value) => {
        return value.catName;
      });

      this.$emit("edittoposts", this.editPost);
    },

    //props recieved when emitted from modal to here
    //received a single category in updateCats
    addtoCat: function (updateCats) {
      if(updateCats==""){
        this.modalEdit = false;
        return; 
      }
      this.editCats.push({ catName: updateCats, checked: true });
      this.checkedNames = this.editCats;
      this.modalEdit = false;
    },
    show: function (value, event, id) {
      if (event.target.checked) {
        value.checked = true;
        console.log(JSON.stringify(value));
        this.checkedNames.splice(id, 0, value);
        console.log(JSON.stringify(this.checkedNames));
      } else {
        value.checked = false;
        this.checkedNames = this.checkedNames.filter((val, ind) => {
          return this.checkedNames[ind] != value;
        });
      }
      this.editPost["categories"] = this.checkedNames.map((value) => {
        return value.catName;
      });
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


.selectLabel {
  margin: 6px;
  font-size: 1rem;
  padding: 5px 1rem;
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