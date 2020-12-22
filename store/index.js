import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		carts: uni.getStorageSync('carts')||[]
	},
	mutations: {
		addToCarts(state, good) {
			var currentGood = state.carts.find(item => {
				if (item.id == good.id) {
					return item;
				}
			})
			if(currentGood){
				currentGood.buynum += good.buynum
			}
			else{
				state.carts.push(good)
			}
			uni.setStorageSync('carts',state.carts)
		}
	},
	actions: {}
})
export default store
