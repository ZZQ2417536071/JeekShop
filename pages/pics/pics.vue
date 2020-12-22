<template>
	<view class="pics">
		<scroll-view scroll-y class="left">
			<view @click="leftClickHandle(index,item)" v-for="(item,index) in cates" :key="item.title" :class="{'active':active==index}">
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="item in secondData" :key="item.id">
				<!--预览图片-->
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="secondData.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				//左边分类数据
				cates: [],
				//当前激活的分类
				active: 3,
				//分类详情数据
				secondData: []
			}
		},
		onLoad() {
			this.getPicsCate()
		},
		methods: {
			//获取分类数据
			async getPicsCate() {
				const result = await myRequestGet("/api/getimgcategory")
				this.cates = result.message
				this.leftClickHandle(this.active, this.cates[this.active])
			},
			async leftClickHandle(index, item) {
				this.active = index;
				const res = await myRequestGet('/api/getimages/' + item.id)
				this.secondData = res.message
			},
			//图片预览
			previewImg(current) {
				const urls = this.secondData.map(item => {
					return item.img_url
				})
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	.pics {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;

			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				background: pink;
				color: #fff;
			}
		}

		.right {
			height: 100%;
			width: 520rpx;
			margin: 10rpx auto;

			.item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}

				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
