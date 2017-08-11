import Vue from 'vue'
import App from './App'
import router from './router'
import  'bootstrap/dist/css/bootstrap.css'
import VueResource from "vue-resource"
Vue.use(VueResource);
new Vue({
  router,
  /*template: '<App/>',
  components: { App }*/
  ...App //等价于上面两行
}).$mount("#app")
