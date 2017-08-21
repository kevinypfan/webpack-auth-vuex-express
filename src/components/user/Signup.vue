<template>
  <div>
    <h1>
        Signup
    </h1>
    <form @submit.prevent="onSignup">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" v-model="email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <div class="form-group">
        <label for="exampleInputNickname">Nickname</label>
        <input type="Nickname" class="form-control" id="exampleInputNickname1" placeholder="Nickname" v-model="nickname">
      </div>
      <div class="form-group">
        <VueImgInputer v-model="picValue" theme="light" size="small"></VueImgInputer>
      </div>

      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>
import VueImgInputer from 'vue-img-inputer'
export default {
  data (){
    return {
      email: "",
      password: "",
      nickname: "",
      picValue: ""
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    onSignup () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password, userNickname: this.nickname})
    }
  },
  watch:{
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/');
      }
    }
  },
  created(){
    // this.$http.get('/note').then((response)=>{
    //   this.note = response.body.name + response.status
    // },(err)=>{
    //   this.note = err
    // });
  },
  components: {
    VueImgInputer
  }
}
</script>

<style>

</style>
