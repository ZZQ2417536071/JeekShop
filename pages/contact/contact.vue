<template>
	<view class="contact">
		<image class="img" src="http://zj.igeekhome.com/data/upload/20191202/5de4851203073.jpg"></image>
		<view class="info">
			<view @click="phone">无锡极客信息技术有限公司：0510-81018661 ( 点击拨打 )</view>
			<view>无锡新吴区震泽路18号国家软件园巨蟹座B座一楼
			</view>
		</view>
		<map class="map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				longitude: 120.37138,
				latitude: 31.48795,
				scale: 13,
				markers: [{
					longitude: 120.37138,
					latitude: 31.48795,
					iconPath: '../../static/hmlogo.png',
					width: 30,
					height: 30
				}]
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '0510-81018661'
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact {
		.img {
			width: 750rpx;
			height: 320rpx;
		}

		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;

			view {
				line-height: 80rpx;
				border-bottom: 1px solid #eee;
			}
		}

		.map {
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
