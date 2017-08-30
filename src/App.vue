<template>
    <div>
        <app-header></app-header>
        <div class="container">
            <router-view></router-view>
        </div>
        <div class="lastspace">

        </div>
    </div>

</template>

<script>
    import Header from './components/Header.vue'
export default{
    components:{
        appHeader: Header
    }
}
</script>

<style>
  @import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
  * {
    font-family: "Noto Sans TC", sans-serif;
  }
  .container {
    width: 600px;
  }
  .lastspace {
    height: 150px;
  }
</style>
