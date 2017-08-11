<template>
  <div>
    <div class="panel panel-warning fl">
      <div class="panel-heading">
        <span v-show="!flag">书名：{{book.bookName}}</span>
        <input type="text" v-model="book.bookName" v-show="flag">
      </div>
      <div class="panel-body text-center">
        <img :src="book.bookCover">
      </div>
      <div class="panel-footer">
        价格：<span v-show="!flag">{{book.bookPrice | currency('¥')}}</span>
        <input type="text" v-model="book.bookPrice" v-show="flag">
      </div>
      <button class="btn btn-danger" @click="remove" v-show="!flag">delete</button>
      <button class="btn btn-warning" @click="updata" v-show="!flag">updata</button>
      <button class="btn btn-primary" @click="submit" v-show="flag">submit</button>
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
      this.id = this.$route.params.id;
      this.$http.get("/book?id=" + this.id).then(res=> {
        this.book = res.body;
      });
    },
    data(){
      return {
        book: {
          bookName: "",
          bookPrice: "",
          bookCover: ""
        },
        id: "",
        flag: false
      }
    },
    components: {},
    methods: {
      remove(){
        this.$http.delete("/book?id=" + this.id).then(res=> {
          this.$router.push("/list");
        })
      },
      updata(){
        this.flag = !this.flag
      },
      submit(){
        this.$http.put("/book?id=" + this.id, this.book).then(()=> {
          this.flag = false;
        })
      }
    }
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
