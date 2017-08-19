<template>
  <div>
    <h1>
        Login
    </h1>
    <form @submit.prevent="onLogin">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" v-model="email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data (){
    return {
      email: "",
      password: ""
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch('userLogin', {email: this.email, password: this.password})
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
  }
}
</script>

<style>

</style>
