import Vue from 'vue'
import VueResource from 'vue-resource'
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'
import vFilter from '@/utils/myFilter'

// icon
import '@/icons'
Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false
for (let key in vFilter) {
  Vue.filter(key, vFilter[key])
}

// Router navigation guard
router.beforeEach((to, from, next) => {
  // If the user accesses the login page, allow access directly
  if (to.path === '/login') return next()
  // Retrieve the saved token value from sessionStorage
  const tokenStr = localStorage.getItem('loginToken')
  // If there is no token, forcefully redirect to the login page
  if (!tokenStr) return next('/login')
  next()
})


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
