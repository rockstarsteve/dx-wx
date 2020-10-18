import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.globalData = {}

import './utils/request.js'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
