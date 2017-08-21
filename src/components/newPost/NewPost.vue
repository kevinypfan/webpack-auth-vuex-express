<template lang="html">
  <form @submit.prevent="newPost">
    <VueImgInputer v-model="picValue" theme="light" size="large"></VueImgInputer>
    <div class="form-group">
      <label for="postTitle">Post Title</label>
      <input type="text" class="form-control" id="postTitle" placeholder="Post Title" v-model="postTitle">
    </div>
    <div class="form-group">
      <label for="postImg">postImg</label>
      <input type="text" class="form-control" id="postImg" placeholder="postImg" v-model="postImg">
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>
</template>

<script>
import VueImgInputer from 'vue-img-inputer'
export default {
  data(){
    return {
      postTitle: "",
      postImg: "",
      picValue: ""
    }
  },
  methods: {
    newPost () {
      var token = window.localStorage.getItem("x-auth");
      this.$http.post('/posts',{postTitle: this.postTitle, postImg: this.postImg},{headers: {"x-auth": token}}).then(()=>{
        this.$router.push('/');
      })
    }
  },
  components: {
    VueImgInputer
  }
}
</script>

<style lang="css">
</style>
