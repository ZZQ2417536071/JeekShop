<template>
	<view class="hot_goods">
		<view class="tit">推荐商品</view>
		<view class="goods_list">
			<view class="goods_item" v-for="item in goods" :key="item.id" @click="itemClick(item)">
				<image :src="item.img_url"></image>
				<view class="price">
					<text>{{item.sell_price}}</text>
					<text>{{item.market_price}}</text>
				</view>
				<view class="name">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goods'],
		data() {
			return {

			};
		},
		methods: {
			itemClick(item) {
				uni.navigateTo({
					url: '/pages/goodsdetail/goodsdetail?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.hot_goods {
		background: #eee;

		.tit {
			border-top: 2px solid #eee;
			border-bottom: 2px solid #eee;
			margin-top: 20px;
			margin-bottom: 3px;
			color: blue;
			height: 50px;
			line-height: 50px;
			text-align: center;
			letter-spacing: 20px;
			background: #fff;
		}

		.goods_list {
			display: flex;
			padding: 0 15rpx;
			justify-content: space-between;
			overflow: hidden;
			flex-wrap: wrap;

			.goods_item {
				width: 355rpx;
				margin-bottom: 15rpx;
				background: #fff;
				padding: 10px;
				box-sizing: border-box;

				image {
					height: 150px;
					width: 100%;
					mix-width: 160px;
					margin: 10px auto;
				}

				.price {
					font-size: 18px;
					color: red;
					padding: 8px 0;

					text:nth-child(2) {
						color: #ccc;
						text-decoration: line-through;
						margin-left: 10px;
						font-size: 13px;
					}
				}

				.name {
					font-size: 14px;

				}
			}
		}
	}
</style>
