<template>
  <div>
    <div class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand">vue练习</a>
        </div>
        <ul class="navbar-nav nav">
          <li>
            <router-link to="/list">图书列表</router-link>
            <router-link to="/add">添加图书</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    components: {},
    methods: {}
  }
</script>

<style scoped>
.navbar-nav li a{
  display: inline-block;
}
</style>
