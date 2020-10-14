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
			<view class="info-content-contianer">
				<view class="info-content-top">
					<view class="div-top"></view>
					<view class="div-header">
						<view class="div-header-line div-header-line-left"></view>
						<view class="div-header-text">
							预约信息
						</view>
						<view class="div-header-line div-header-line-right"></view>
					</view>
					<view class="info-line">
						<view class="line-left">预约类型</view>
						<view class="line-right">个人现金业务</view>
					</view>
					<view class="info-line">
						<view class="line-left">预约日期</view>
						<view class="line-right">2020-07-31</view>
					</view>
					<view class="info-line">
						<view class="line-left">预约手机号</view>
						<view class="line-right">17709876548</view>
					</view>
					<view class="cleavage-div"></view>
				</view>
				<view class="info-content-bottom">
					<view class="cleavage-div-line"></view>
					<view class="cleavage-div"></view>
					<view class="bottom-title">网点信息</view>
					<view class="bottom-local">
						<img src="../../static/image/common/logo_s.png" class="bottom-local-img"  alt="">
						<view class="bottom-local-text">华夏银行宝山支行网点</view>
					</view>
					<view class="bottom-line">地址：上海市宝山区牡丹江路1332-1346号</view>
					<view class="bottom-line">电话:（021）56110330</view>
					<view class="bottom-line">营业时间：周一到周五8:30-17:30</view>
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

			.cleavage-div {
				height: 15rpx;
				width: calc(100% - 30rpx);
				height: 15rpx;
				position: absolute;
				left: 15rpx;
			}

			.cleavage-div::before {
				content: '';
				position: absolute;
				width: 15rpx;
				height: 15rpx;
				left: -15rpx;
				
				
			}
			
			.cleavage-div::after {
				content: '';
				position: absolute;
				width: 15rpx;
				height: 15rpx;
				right: -15rpx;
				
			}
			
			.info-content-top {
				position: relative;
				width: 660rpx;
				height: 320rpx;
				background-color: #FFFFFF;
				margin-bottom: 30rpx;

				.cleavage-div {
					background: #FFFFFF;
					bottom: -15rpx;
					
				}
				.cleavage-div::before {
					background-image: radial-gradient(circle 15rpx at 0 100%, transparent 50rpx, #fff 50%);
				}
				.cleavage-div::after {
					background-image: radial-gradient(circle 15rpx at 100% 100%, transparent 50rpx, #fff 50%);
				}
				
				

				.div-top {
					width: 100%;
					height: 26rpx;
					background: linear-gradient(180deg, #FFD6D6 0%, #FFFFFF 100%);
				}

				.div-header {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 10rpx;

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

				.info-line {
					padding-left: 41rpx;
					padding-right: 41rpx;
					display: flex;
					height: 80rpx;
					align-items: center;

					.line-left {
						flex: 5;
						font-size: 26rpx;
						font-weight: 400;
						color: #8B8A8A;
					}

					.line-right {
						flex: 10;
						font-size: 26rpx;
						font-weight: 600;
						color: #464141;
					}
				}
			}

			.info-content-bottom {
				padding-left: 41rpx;
				position: relative;
				width: 660rpx;
				height: 320rpx;
				background-color: #FFFFFF;

				.cleavage-div {
					background: #FFFFFF;
					top: -15rpx;
				}
				.cleavage-div::before {
					background-image: radial-gradient(circle 15rpx at 0 0, transparent 50rpx, #fff 50%);
				}
				.cleavage-div::after {
					background-image: radial-gradient(circle 15rpx at 100% 0, transparent 50rpx, #fff 50%);
				}
				.cleavage-div-line{
					width: 90%;
					left: 50%;
					transform: translateX(-50%);
					position: absolute;
					border: 2rpx dashed #D7D7D7;
					top: -14rpx;
					z-index: 100;
				}
				
				.bottom-title{
					font-size: 26rpx;
					font-weight: 400;
					color: #8B8A8A;
					line-height: 60rpx;
				}
				
				.bottom-local{
					line-height: 70rpx;
					display: flex;
					align-items: center;
					.bottom-local-img{
						width: 35rpx;
						height: 35rpx;
					}
					.bottom-local-text{
						margin-left: 15rpx;
						font-size: 28rpx;
						font-weight: 600;
						color: #464141;
					}
				}
				
				.bottom-line{
					font-size: 22rpx;
					font-weight: 400;
					color: #8B8A8A;
					line-height: 40rpx;
				}
				
			}
		}
	}
</style>
