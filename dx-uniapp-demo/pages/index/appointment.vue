<template>
	<view class="container">
		<view class="form">
			<view class="menu-fist line">
				<view class="attr">预约类型</view>
				<view class="values">个人现金业务</view>
			</view>
			<view class="menu-second line">
				<view class="attr">二级菜单</view>
				<view class="values">取现预约</view>
			</view>
			<view class="line">
				<view class="attr">预约方式</view>
				<view class="values">手机号</view>
			</view>
			<view class="line">
				<view class="attr">预约日期</view>
				<view class="values">2020-07-31</view>
			</view>
			<view class="line">
				<view class="attr">预约手机号</view>
				<view class="values">17709876548</view>
			</view>
			<view class="cleavage-line"></view>

			<view class="outlets">
				<view class="outlets-title outlets-line">
					预约网点信息
				</view>
				<view class="outlets-select outlets-line">
					<view class="outlets-select-title">
						<image src="../../static/image/common/logo_s.png" class="outlets-logo" mode=""></image>
						<view class="">华夏银行宝山支行网点</view>
					</view>
					<view class="outlets-select-text">选择</view>
				</view>
				<view class="info-line">
					地址：上海市宝山区牡丹江路1332-1346号
				</view>
				<view class="info-line">
					电话:（021）56110330
				</view>
				<view class="info-line">
					营业时间：周一到周五8:30-17:30
				</view>

			</view>

		</view>
		<view class="sub-btn" @tap="success">确认提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			success() {
				uni.navigateTo({
					url: '/pages/index/appointment-success'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		background-color: #F7F7F7;
		padding-top: 25rpx;

		.form {
			background-color: #FFFFFF;
			width: 690rpx;
			height: 860rpx;
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			padding-left: 30rpx;
			padding-right: 38rpx;
			padding-top: 38rpx;

			.line {
				height: 85rpx;
				display: flex;
				justify-content: space-between;

				.attr {
					font-size: 26rpx;
					font-weight: 400;
					color: #8B8A8A;
				}

				.values {
					font-size: 26rpx;
					font-weight: 600;
					color: #464141;
				}
			}

			.cleavage-line {
				border: 1rpx dotted #D7D7D7;
			}

			.outlets {
				margin-top: 30rpx;

				.outlets-line {
					line-height: 85rpx;
				}

				.outlets-title {
					font-size: 28rpx;
					font-weight: 600;
					color: #464141;
				}

				.outlets-select {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.outlets-select-title {
						display: flex;
						align-items: center;

						.outlets-logo {
							width: 40rpx;
							height: 40rpx;
						}
						view{
							margin-left: 20rpx;
							font-size: 28rpx;
							font-weight: 600;
							color: #464141;
						}
					}

					.outlets-select-text {
						font-size: 24rpx;
						font-weight: 400;
						color: #FF4C4C;
					}
				}

				.info-line {
					line-height: 50rpx;
					font-size: 22rpx;
					font-weight: 400;
					color: #8B8A8A;
				}
			}
		}

		.sub-btn {
			margin-top: 50rpx;
			width: 600rpx;
			height: 90rpx;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			background: linear-gradient(104deg, #FF9595 0%, #FF4E5B 100%);
			box-shadow: 0rpx 11rpx 19rpx 0rpx rgba(249, 86, 86, 0.25);
			border-radius: 45rpx;

			text-align: center;
			font-size: 28rpx;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 90rpx;
		}
	}
</style>
