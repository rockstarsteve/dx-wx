<template>
	<view class="container">
		<view class="head-temp">
			<myHead class="my-head" :title="'华夏银行'"></myHead>
		</view>

		<view class="container-body">
			<view class="content">
				<div class="content-top">
					<view class="div-header">
						<view class="div-header-line div-header-line-left"></view>
						<view class="div-header-text">
							预约信息
						</view>
						<view class="div-header-line div-header-line-right"></view>
					</view>
					<view class="info-line">
						<view class="line-left">预约类型</view>
						<view class="line-right">{{info.menuname}}</view>
					</view>
					<view class="info-line">
						<view class="line-left">预约日期</view>
						<view class="line-right">{{info.appointmentdate}}</view>
					</view>
					<view class="info-line">
						<view class="line-left">{{info.type}}</view>
						<view class="line-right">{{info.cardNum}}</view>
					</view>
					<view class="info-line">
						<view class="line-left">网点信息</view>
					</view>
					<view class="bottom-local">
						<img src="../../static/image/common/logo_s.png" class="bottom-local-img" alt="">
						<view class="bottom-local-text">{{info.orgname}}</view>
					</view>
					<view class="bottom-line">地址： {{info.address}}</view>
					<view class="bottom-line">电话： {{info.phone}}</view>
					<view class="bottom-line">营业时间： {{info.businesshours}}</view>
					<view class="cleavage-div"></view>
				</div>
				<view class="content-bottom">
					<view class="cleavage-div-line"></view>
					<view class="cleavage-div"></view>
					<image :src="qrImg" class="qr-img" alt="错误">
						<view class="content-bottom-text">预约信息</view>
						<view class="content-bottom-btn" @tap="cancel()">取消预约</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myHead from "@/components/head/head.vue"
	import QR from "@/utils/wxqrcode.js"
	export default {
		components: {
			myHead
		},
		data() {
			return {
				id: '',
				qrImg: '',
				info: {
					id: '',
					menuname: '',
					appointmentdate: '',
					type: '',
					cardNum: '',
					orgcode: '',
					orgname: '',
					address: '',
					phone: '',
					businesshours: '',
					queuenum: ''
				}
			}
		},
		onLoad(option) {
			let _this = this
			_this.id = option.id
			
		},
		onShow(op){
			let _this = this
			_this.sendRequest({
				url: "/api/getsysTakequeuenum",
				method: "post",
				data: {
					id: _this.id,
					openid: _this.globalData.token,
				},
				hideLoading: false,
				success: function(res) {
					if(res.data.length > 0){
						const obj = res.data[0]
						if(obj.certificatetype == 16){
							_this.info.type = '身份证'
							_this.info.cardNum = obj.certno
						}else if(obj.certificatetype == 4){
							_this.info.type = '银行卡'
							_this.info.cardNum = obj.englishname
						}else{
							_this.info.type = '证件号'
							_this.info.cardNum = obj.certno
						}
						_this.id = obj.id
						_this.info.id = obj.id
						_this.info.menuname = obj.menuname
						_this.info.appointmentdate = obj.appointmentdate
						_this.info.orgcode = obj.orgcode
						_this.qrImg = QR.createQrCodeImg(obj.queuenum, {size: parseInt(100)})
						_this.sendRequest({
							url: "/api/getSysOffice",
							method: "post",
							data: {
								code: obj.orgcode
							},
							hideLoading: false,
							success: function(res) {
								const obj = res.data[0]
								if (res.data.length > 0) {
									_this.info.orgname = obj.name
									_this.info.address = obj.address
									_this.info.phone = obj.phone
									_this.info.businesshours = obj.businesshours
								} 
							}
						})
					}else{
						uni.showModal({
							content: "服务暂不可用"
						});
					}
				}
			})
		},
		methods:{
			cancel(){
				let _this = this
				_this.sendRequest({
					url: "/api/cancelSysTakequeuenum",
					method: "post",
					data: {
						id: _this.id
					},
					hideLoading: false,
					success: function(res) {
						uni.showModal({
							showCancel: false,
							content: "取消成功"
						});
						uni.switchTab({
						  url: '/pages/my/my'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		height: 100vh;
		width: 100vw;
		z-index: 10;

		.head-temp {
			height: 15%;
			width: 100vw;
		}

		.container-body {
			width: 100vw;
			height: 85%;
			overflow-y: scroll;
			position: relative;

			.content {
				padding-top: 54rpx;
				position: relative;
				left: 50%;
				transform: translateX(-50%);
				margin-bottom: 3vh;
				z-index: 999;
				height: 1090rpx;
				width: 690rpx;
				background-color: pink;
				background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
				box-shadow: 0rpx 8rpx 67rpx 0px rgba(121, 99, 99, 0.11);

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

				.content-top {
					position: relative;
					height: 540rpx;

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
						height: 60rpx;
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

					.bottom-local {
						padding-left: 41rpx;
						line-height: 70rpx;
						display: flex;
						align-items: center;

						.bottom-local-img {
							width: 35rpx;
							height: 35rpx;
						}

						.bottom-local-text {
							margin-left: 15rpx;
							font-size: 28rpx;
							font-weight: 600;
							color: #464141;
						}
					}

					.bottom-line {
						padding-left: 41rpx;
						font-size: 22rpx;
						font-weight: 400;
						color: #8B8A8A;
						line-height: 50rpx;
					}
				}

				.content-bottom {
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;

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

					.cleavage-div-line {
						width: 90%;
						left: 50%;
						transform: translateX(-50%);
						position: absolute;
						border: 2rpx dashed #D7D7D7;
						top: -14rpx;
						z-index: 100;
					}

					.cleavage-div-line {
						width: 90%;
						left: 50%;
						transform: translateX(-50%);
						position: absolute;
						border: 2rpx dashed #D7D7D7;
						top: -14rpx;
						z-index: 100;
					}

					.qr-img {
						margin-top: 50rpx;
						width: 210rpx;
						height: 210rpx;
						border: 10rpx solid #FBEFF0;
						border-radius: 10rpx;
					}

					.content-bottom-text {
						margin-top: 20rpx;
						font-size: 22rpx;
						font-weight: 400;
						color: #FF4C4C;
					}

					.content-bottom-btn {
						margin-top: 37rpx;
						width: 200rpx;
						height: 70rpx;
						border-radius: 40rpx;
						border: 1rpx solid #FF4C4C;
						text-align: center;
						font-size: 28rpx;
						font-weight: 500;
						color: #FF4C4C;
						line-height: 70rpx;
					}

				}
			}
		}
	}
</style>
