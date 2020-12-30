import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueResource from 'vue-resource'
import axios from 'axios'
import alertify from 'alertifyjs'

Vue.use(VueResource)
Vue.use(axios)
Vue.use(alertify)
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
