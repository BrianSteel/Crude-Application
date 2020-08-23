<template>
  <div class="overview">
    <div class="container">
      <h1 class="grey-text text-darken-4 center heading">Posts</h1>
      <table class="card highlight centered">
        <thead class="width2">
          <tr class="grey lighten-2 grey-text text-darken-3">
            <th class="width">Post Title</th>
            <th class="width2">Catergory</th>
            <th class="width2">
              Actions
              <a
                class="btn-floating pulse btn-large orange z-depth-3 btn-position"
                @click.prevent="modal=true"
              >
                <i class="material-icons">add</i>
              </a>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(post, index) in allPosts"
            :key="index"
            class="white bg-darken-1"
            @click="goToPost(index)"
          >
            <td class="width">{{post.title}}</td>
            <td>
              <ul v-for="(category, i) in post.categories" :key="i">
                <li>{{category}}</li>
              </ul>
            </td>
            <td class="width2">
              <a @click.prevent.stop="editPost(post, index)" href class="btn btn-floating pad blue lighten-2">
                <i class="material-icons">edit</i>
              </a>
              <a @click.prevent.stop="deletePost(post)" href class="btn btn-floating pad blue lighten-2">
                <i class="material-icons">delete</i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- For ADD MODAL -->
    <div v-if="modal && edit===false">
      <transition name="modal">
        <div class="modal-cover">
          <div class="modal-align">
            <a href class="cross" @click.prevent = "modal = false">
              <i class="material-icons">close</i>
            </a>
            <AddModal v-on:addtoposts="addtoPosts($event)" />
          </div>
        </div>
      </transition>
    </div>

    <!-- For EDIT MODAL -->
    <div v-if="edit && modal">
      <transition name="modal">
        <div class="modal-cover">
          <div class="modal-align">
            <a href class="cross" @click.prevent = "modal = false; edit = false">
              <i class="material-icons">close</i>
            </a>
            <EditMode 
            v-on:edittoposts="edittoPosts($event)" 
            :h3 = editYourPost 
            :title = title
            :detail = detail
            :cats= cats
            :id = id
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import AddModal from "./AddModal";
import EditMode from "./EditMode";

export default {
  name: "overview",
  components: {
    AddModal,
    EditMode
  },
  data() {
    return {
      addYourPost: 'Add Your Post',
      editYourPost: 'Edit Your Post',
      id: null,
      title: '',
      detail: '',
      cats: [],
      modal: false,
      edit: false,
      Posts: null,
      editSinglePost: {},
      singlePost: {},
      allPosts: [
        {
          title: "Vue Crud App",
          body:
            "Make Crud App with Vscode, Vue js, materialize and magical codes",
          categories: ["!Vuex", "!Veutify", "Vue", "Router", "MaterializeCSS"],
        },
        {
          title: "React Crud App",
          body:
            "Make Crud App with Vscode, React js, bootstrap and magical codes",
          categories: ["!React"],
        },
        {
          title: "Angular Crud App",
          body:
            "Make Crud App with Vscode, Angular js, materialize and magical codes",
          categories: ["!Angular"],
        },
      ],
    };
  },
  methods: {
    deletePost: function (post) {
      this.allPosts = this.allPosts.filter((onePost) => {
        return onePost != post;
      });
    },
    editPost: function(post, index){
      let array = [];
      this.edit = true;
      this.modal = true;
      array = this.allPosts.filter((onePost) => {
        return onePost === post;
      });
      this.id = index;
      this.title = array[0].title;
      this.detail = array[0].body;
      this.cats = array[0].categories.map((value)=>{
        return {
          catName: value,
          checked: true
        }
      });
    },
    goToPost: function (index) {
      //console.log(this.allPosts)
      this.singlePost = this.allPosts.filter((onePost, ind) => {
        return ind === index;
      });
      let title = this.singlePost[0].title;
      let body = this.singlePost[0].body;
      this.$router.push({ name: "singlePost", params: { id: index, title: title, body: body, categories: this.singlePost[0].categories } });
    },
    addtoPosts: function (updatePosts) {

      
      /* if(updatePosts.title=="" || updatePosts.body==""){
        this.modal = false;
        return; 
      } */
      this.allPosts.push(updatePosts);
      this.modal = false;
    },
    edittoPosts: function (editPosts){
      let i = editPosts.id;
      delete editPosts.id;
      this.allPosts.splice(i, 1, editPosts);
      this.modal = false;
      this.edit = false;
    }
  },
};
</script>

<style scoped>
.heading {
  margin: 3rem 0;
}

.btn-position {
  position: relative;

  left: 20px;
}

.width {
  width: 20rem;
}
.width2 {
  width: 10rem;
}

.pad {
  margin: 0 10px;
}

ul,
li {
  display: inline;
  margin: 0 2px;
  word-break: none;
}

li {
  background: rgb(214, 179, 240);
  padding: 3px 8px;
  border-radius: 6px;
}

tr {
  cursor: pointer;
}

.cross{
  position: relative;
  top: 2rem;
  left: 70rem;
  z-index: 10;
}

.modal-cover {
  position: fixed;
  z-index: 10;
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
  top: 5%;
}
</style>