<template lang="html">
  <form @submit.prevent="newPost">
    <div class="form-group">
      <label for="postTitle">Post Title</label>
      <input type="text" class="form-control" id="postTitle" placeholder="Post Title" v-model="postTitle">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">postImg</label>
      <input type="text" class="form-control" id="postImg" placeholder="postImg" v-model="postImg">
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>
</template>

<script>
export default {
  data(){
    return {
      postTitle: "",
      postImg: ""
    }
  },
  methods: {
    newPost () {
      var token = window.localStorage.getItem("x-auth");
      this.$http.post('/posts',{postTitle: this.postTitle, postImg: this.postImg},{headers: {"x-auth": token}}).then(()=>{
        this.$router.push('/');
      })
    }
  }
}
</script>

<style lang="css">
</style>
