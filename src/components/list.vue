<template>
  <div>
    <div class="col-md-3">
      <div class="panel panel-warning fl" v-for="book in books">
        <div class="panel-heading">书名：{{book.bookName}}</div>
        <div class="panel-body text-center">
          <img :src="book.bookCover">
        </div>
        <div class="panel-footer">价格：{{book.bookPrice | currency('¥')}}</div>
        <router-link :to="{name:'detail',params:{id:book.id}}">进入详情</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    filters: {
      currency(input, param1){
        return param1 + " " + input;
      }
    },
    created(){
      this.$http.get("/book").then((res)=> {
        this.books = res.body;
      })
    },
    data(){
      return {
        books: []
      }
    },
    components: {},
    methods: {}
  }
</script>

<style scoped>
  img {
    width: 200px;
    height: 200px;
  }

  .fl {
    float: left;
  }
</style>
