<template lang="html">
  <form @submit.prevent="newPost">
    <VueImgInputer v-model="picValue" theme="light" size="large" maxSize="10240" placeholder="點擊或拖曳圖片選擇" bottomText="點擊或拖曳以修改"></VueImgInputer>
    <div class="form-group">
      <label for="postTitle">Comment:</label>
      <textarea class="form-control" rows="5" id="postTitle" placeholder="Post Title" v-model="postTitle" wrap="virtual"></textarea>
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
      picValue: ""
    }
  },
  methods: {
    newPost () {
      var token = window.localStorage.getItem("x-auth");
      var formData = new FormData();
      formData.append('postTitle', this.postTitle)
      formData.append('postImg', this.picValue)
      this.$http.post('/posts', formData, {headers: {"x-auth": token}}).then(()=>{
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
