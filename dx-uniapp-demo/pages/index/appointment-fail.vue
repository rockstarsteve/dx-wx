<template>
	<view class="container">
		<image src="../../static/image/index/appointment-fail.png" class="appointment-success" mode=""></image>
		<view class="appointment-title">
			预约取号失败
		</view>
		<view class="appointment-note">
			别紧张，试试再取一次！
		</view>
		<view class="btn">
			重新取号
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(#FFFFFF, #F7F7F7);
		display: flex;
		flex-direction: column;
		align-items: center;

		.appointment-success {
			width: 640rpx;
			height: 200rpx;
		}
		
		.appointment-title{
			margin-top: 31rpx;
			font-size: 30rpx;
			font-weight: 600;
			color: #464141;
		}
		
		.appointment-note{
			margin-top: 21rpx;
			font-size: 22rpx;
			font-weight: 400;
			color: #8B8A8A;
		}
		.btn{
			margin-top: 70rpx;
			width: 200rpx;
			height: 70rpx;
			background: linear-gradient(104deg, #FF9595 0%, #FF4E5B 100%);
			box-shadow: 0rpx 11rpx 19rpx 0rpx rgba(249, 86, 86, 0.25);
			border-radius: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 70rpx;
		}
	}
</style>
