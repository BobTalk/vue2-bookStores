import Vue from 'vue'
import Router from 'vue-router'
/*import Add from "../components/add"*/
/*import List from "../components/list"
import Detail from "../components/detail"*/
const Add = r => require.ensure([], () => r(require('../components/add')), 'add')
const List = r => require.ensure([], () => r(require('../components/list')), 'list')
const Detail = r => require.ensure([], () => r(require('../components/detail')), 'detail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/add',
      component: Add
    },
    {
      path: "/",
      redirect: "/list"
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/detail/:id', //this.$router.params.id
      name: 'detail', //路径别名
      component: Detail
    }
  ]
})
