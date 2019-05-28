import Vue from 'vue'
import Router from 'vue-router'
import First from './views'
import FirstCenter from './views/first/center/centercontainer.vue'
import FirstLeft from './views/first/left/leftcontainer.vue'
import FirstRight from './views/first/right/rightcontainer.vue'
import Secondleft from './views/second/left/leftcontainer.vue'
import SecondRight from './views/second/right/rightcontainer.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'first',
      component: First
    },
    {
      path: '/firstleft',
      name: 'firstleft',
      component: FirstLeft
    },
    {
      path: '/firstcenter',
      name: 'firstcenter',
      component: FirstCenter
    },
    {
      path: '/firstRight',
      name: 'firstRight',
      component: FirstRight
    },
    {
      path: '/secondleft',
      name: 'secondleft',
      component: Secondleft
    },
    {
      path: '/secondRight',
      name: 'secondRight',
      component: SecondRight
    }
  ]
})
