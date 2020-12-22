<template>
	<view class="home">
		<swiper indicator-dots :autoplay="true" :interval="2000" circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<!-- 一般用法 -->
		<uni-grid :column="4">
			<uni-grid-item v-for="item in navs" :key="item.title">
				<view :class="item.icons" @click="goSuperMarket(item)"></view>
				<text>{{item.title}}</text>
			</uni-grid-item>
		</uni-grid>
		<goodlist :goods="goods"></goodlist>
		<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
		<uni-load-more v-else :status="'noMore'"></uni-load-more>

	</view>
</template>

<script>
	import uniBadge from "@/components/uni-ui/uni-badge/uni-badge.vue";
	import uniGrid from "@/components/uni-ui/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-ui/uni-grid-item/uni-grid-item.vue"
	import uniLoadMore from "@/components/uni-ui/uni-load-more/uni-load-more.vue"
	import goodlist from '@/components/goodlist/goodlist.vue'
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				swipers: [],
				goods: [],
				pageindex: 1,
				flag: false,
				navs: [{
						icons: "iconfont icon-ziyuan",
						title: "极客超市",
						path: "/pages/goods/goods"
					},
					{
						icons: "iconfont icon-tupian",
						title: "社区图片",
						path: "/pages/pics/pics"
					},
					{
						icons: "iconfont icon-guanyuwomen",
						title: "联系我们",
						path: "/pages/contact/contact"
					},
					{
						icons: "iconfont icon-shipin",
						title: "学习视频",
						path: "/pages/videos/videos"
					}
				]
			}
		},
		onLoad() {
			this.getSwipers();
			this.getProducts();
		},
		methods: {
			async getSwipers() {
				let result = await myRequestGet("/api/getlunbo");
				if (result.status === 0) {
					this.swipers = result.message;
				}
			},
			async getProducts() {
				let result = await myRequestGet("/api/getgoods", {
					pageindex: this.pageindex
				});
				if (result.status === 0) {
					this.goods = [...this.goods, ...result.message];
				}
			},
			goSuperMarket(item) {
				uni.navigateTo({
					url: item.path
				})
			}
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
		components: {
			uniBadge,
			uniGrid,
			uniGridItem,
			uniLoadMore,
			goodlist
		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			height: 380rpx;

			image {
				width: 750rpx;
				height: 380rpx;
			}
		}

		.uni-grid-item {
			text-align: center;

			.iconfont {
				background: pink;
				line-height: 90rpx;
				width: 100rpx;
				height: 100rpx;
				border-radius: 90px;
				margin: 10rpx auto;
				font-size: 25px;
			}
		}
	}
</style>
