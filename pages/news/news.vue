<template>
	<view>
		<uni-list>
			<uni-list-item v-for="item in newsList" :key="item.title" :thumb="item.img_url" thumb-size="lg">
				<view slot="body" class="item slot-box slot-text" @click="goDetail(item)"> 
					<view class="tit">{{item.title}}</view>
					<view class="info">
						<text>发表时间：{{item.add_time | formatDate }}</text>
						<text>浏览：{{item.click+123}}次</text>
					</view>
				</view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	import uniList from "@/components/uni-ui/uni-list/uni-list.vue";
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {
				newsList: []
			}
		},
		onLoad() {
			this.getNewsList();
		},
		methods: {
			async getNewsList() {
				const res = await myRequestGet('/api/getnewslist')
				this.newsList = res.message
				console.log(this.newsList)
			},
			goDetail(item) {
				uni.navigateTo({
					url: `/pages/newsdetail/newsdetail?id=${item.id}`
				})
			}
		},
		components: {
			uniList,
			uniListItem
		}
	}
</script>


<style lang="scss">
	.item {
		padding: 5px 10px;
		position: relative;

		.tit {
			font-size: 35rpx;
			font-weight: 800;
		}

		.info {
			font-size: 26rpx;
			margin-top: 20rpx;

			text:nth-child(2) {
				margin-left: 20px;
			}
		}
	}
</style>
