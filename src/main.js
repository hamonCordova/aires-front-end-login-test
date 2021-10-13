import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/scss/styles.scss'

// Utils
import utils from './utils'

utils(Vue)

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  if (!from.name) {
    await store.dispatch('auth/validateSession')

    const user = store.getters['auth/getUser']

    if (to.meta.requireAuth) {
      return !user ? router.replace('/login') : next()
    } else {
      return !user ? next() : router.replace('/')
    }
  }

  if (from.name !== to.name) {
    const user = store.getters['auth/getUser']

    if (to.meta.requireAuth) {
      return !user ? router.replace('/login') : next()
    } else {
      return !user ? next() : router.replace('/')
    }
  }

  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
