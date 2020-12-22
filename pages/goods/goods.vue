<template>
	<view>
		<goodlist :goods="goods"></goodlist>
		<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
		<uni-load-more v-else :status="'noMore'"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-ui/uni-load-more/uni-load-more.vue"
	import goodlist from '@/components/goodlist/goodlist.vue'
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				pageindex: 1,
				flag: false,
				goods: []
			}
		},
		onLoad() {
			this.getProducts();
		},
		methods: {
			async getProducts() {
				let result = await myRequestGet("/api/getgoods", {
					pageindex: this.pageindex
				});
				if (result.status === 0) {
					this.goods = [...this.goods, ...result.message];
				}
			},
		},
		onReachBottom() {
			this.pageindex++;
			if (this.pageindex <= 2) {
				this.getProducts();
			} else {
				//没有更多数据了
				this.flag = true;
			}
		},
		onPullDownRefresh() {
			this.pageindex = 1;
			this.flag = false;
			this.goods = [];
			//请求完成之后停止下拉刷新
			this.getProducts().then(()=>{
				uni.stopPullDownRefresh()
			});
		},
		components: {
			uniLoadMore,
			goodlist
		}
	}
</script>
