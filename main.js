import Vue from 'vue'
import App from './App'
import '@/static/fonts/iconfont.css'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.filter("formatDate", function(data) {
	const date = new Date(data)
	const day = date.getMonth().toString().padStart(2, '0') + '-' + date.getDay().toString().padStart(2, '0')
	return date.getFullYear() + '-' + day
})

const app = new Vue({
	store,
	...App
})
app.$mount()
