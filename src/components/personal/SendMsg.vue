<template lang="html">
  <div class="sendMsg row">
    <div class="col-md-10">
      <input type="text" class="form-control" placeholder="Text input" v-model="message">
    </div>
    <div class="col-md-2">
        <button type="button" class="btn btn-default" @click="sendMsg">send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data () {
    return {
      message: ""
    }
  },
  methods: {
    sendMsg () {
      var token = window.localStorage.getItem("x-auth");
      this.$http.post('/sendMessage', {message: this.message, _id: this.post._id},{headers:{'x-auth':token}}).then((res) => {
        console.log('yes')
      }).catch((err) => {
        console.log('no')
      })
    }
  }
}
</script>

<style lang="css" scoped>
.sendMsg{
  margin-top: 10px;
}
</style>
