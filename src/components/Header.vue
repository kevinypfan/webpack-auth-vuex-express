<template>
  <nav class="navbar navbar-default">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <router-link to="/">
          <a class="navbar-brand" href="#">Home</a>
      </router-link>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <p class="navbar-text" v-if="userIsAuthenticated">{{user.userNickname}}</p>
      <ul class="nav navbar-nav navbar-right">
        <router-link v-for="item in menuItems" :to="item.link" tag="li" activeClass="active" :key="item.title">
            <a href="#">{{item.title}}</a>
        </router-link>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    menuItems(){
      let menuItems = [
        {title: 'Login', link: '/login'},
        {title: 'Signup', link: '/signup'}];
      if (this.userIsAuthenticated) {
        menuItems = [
          {title: 'Chat', link: '/chat'},
          {title: 'Personal', link: '/personal'},
          {title: 'New Post', link: '/newpost'},
          {title: 'Logout', link: '/logout'}
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    },
    user(){
      return this.$store.getters.getUser
    }
  }
}
</script>

<style>

</style>
