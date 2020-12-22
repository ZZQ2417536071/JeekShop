<template>
	<view class="news_detail">
		<view class="news_title">
			{{newsDetail.title}}
		</view>
		<view class="info">
			<text>发表时间：{{newsDetail.add_time|formatDate}}</text>
			<text>浏览：{{newsDetail.click}}</text>
		</view>
		<view class="content">
			<!-- #ifdef MP-WEIXIN|H5 -->
			<rich-text :nodes="newsDetail.content"></rich-text>
			<!-- #endif -->

			<!-- #ifdef MP-ALIPAY -->
			<rich-text :nodes="htmlNodes"></rich-text>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	import parse from '@/utils/htmlparser.js';
	export default {
		data() {
			return {
				id: "",
				newsDetail: {},
				htmlNodes: []
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getNewsDetail()
		},
		methods: {
			async getNewsDetail() {
				const res = await myRequestGet('/api/getnew/' + this.id)
				this.newsDetail = res.message[0]

				//#ifdef MP-ALIPAY
				this.htmlNodes = parse(this.newsDetail.content)
				//#endif
			}
		}
	}
</script>

<style lang="scss">
	.news_detail {
		padding: 15rpx;

		.news_title {
			text-align: center;
			font-size: 35rpx;
			font-weight: 800;
			padding: 15rpx;
		}

		.info {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			padding: 15rpx;
		}

		.content {
			padding: 15rpx;
			font-size: 28rpx;
			color: gray;
		}
	}
</style>
