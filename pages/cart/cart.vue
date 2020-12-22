<template>
	<view>
		<view v-for="item in carts" :key="item.id">
			<text>{{item.name}}</text>
			<text>{{item.buynum}}</text>
			<text>{{item.sellprice}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		computed: {
			...mapState({
				carts: "carts"
			})
		}
	}
</script>

<style>

</style>
