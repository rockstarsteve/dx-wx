<template>
	<view class="container">
		<image src="../../static/image/index/appointment-success.png" class="appointment-success" mode=""></image>
		<view class="appointment-title">
			预约取号成功
		</view>
		<view class="appointment-content">
			请携带有效身份证到预约网点办理业务，在预约时间段内享受优先服务。
		</view>
		<view class="info-content">
			<view class="info-header"></view>
			<view class="info-content-div">
				<view class="div-top"></view>
				<view class="div-header">
					<view class="div-header-line div-header-line-left"></view>
					<view class="div-header-text">
						预约信息
					</view>
					<view class="div-header-line div-header-line-right"></view>
				</view>
			</view>
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

		.appointment-title {
			margin-top: 11rpx;
			font-size: 30rpx;
			font-weight: 600;
			color: #464141;
		}

		.appointment-content {
			margin-top: 21rpx;
			text-align: center;
			width: 404rpx;
			font-size: 22rpx;
			font-weight: 400;
			color: #8B8A8A;
			line-height: 30rpx;
		}

		.info-content {
			margin-top: 64rpx;
			display: flex;
			flex-direction: column;
			position: relative;
			align-items: center;

			.info-header {
				width: 691rpx;
				height: 31rpx;
				background: linear-gradient(180deg, #FF4545 0%, #FF8888 100%);
				border-radius: 16rpx;
			}

			.info-content-div {
				position: relative;
				width: 660rpx;
				height: 670rpx;
				background-color: #FFFFFF;
				top: -15rpx;

				.div-top {
					width: 100%;
					height: 26rpx;
					background: linear-gradient(180deg, #FFD6D6 0%, #FFFFFF 100%);
				}

				.div-header {
					display: flex;
					justify-content: center;
					align-items: center;

					.div-header-line {
						width: 50rpx;
						height: 5rpx;
						border-radius: 50%;
					}

					.div-header-line-left {
						background-image: linear-gradient(to right, #FFFFFF, #FF4C4C);
					}

					.div-header-line-right {
						background-image: linear-gradient(to right, #FF4C4C, #FFFFFF);
					}

					.div-header-text {
						font-size: 30rpx;
						font-weight: 600;
						color: #FF4C4C;
						line-height: 42rpx;
						margin-left: 20rpx;
						margin-right: 20rpx;
					}
				}

			}
		}
	}
</style>
