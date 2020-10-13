<template>
	<view class="container">
		<view class="title-body">
			<view class="title">离我最近</view>
			<image src="../../static/image/index/local.png" class="title-img"></image>
			<view>
				<picker class="uni-list-cell" @change="bindPickerChange" :value="index" :range="array" :range-key="'name'">
					<view class="uni-input">{{array[index].name}}</view>
					<image src="../../static/image/index/select.png" class="title-select-img"></image>
				</picker>
			</view>
		</view>
		<view class="map-body">
			<view class="map-content">
				<map id="map1" ref="map1" class="map1" :latitude="latitude" :longitude="longitude" :markers="covers" :show-location="true">
				</map>	
			</view>
			<cover-view class="address-body">
				<cover-view class="detail-content">
					<cover-view class="address-text">
						广州市黄埔区开发区香雪二路2号
					</cover-view>
					<cover-view class="time-text">
						营业时间：周一到周五8:30-17:30
					</cover-view>
				</cover-view>
				<cover-view class="address-btn-group">
					<cover-view class="address-act call" @tap="getPhone">
						<cover-view class="address-img-div">
							<cover-image src="../../static/image/index/phone.png" class="address-phone-img"></cover-image>
						</cover-view>
						<cover-view class="address-act-text">电话</cover-view>
					</cover-view>
					<cover-view class="address-act goto" @tap="goHere">
						<cover-image src="../../static/image/index/tomap.png" class="address-img"></cover-image>
						<cover-view class="address-act-text">去这儿</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
		</view>
		<view class="business-list">
			<view class="business-item" v-for="(item,index) in menuList" :key="index" @tap="appointmentPlate">
				<view class="business-title">
					<image :src="item.img" class="business-img"></image>
					<view class="business-title-text">{{item.title}}</view>
				</view>
				<view class="business-wait">
					<view class="business-wait-text">当前等待人数</view>
					<view class="business-wait-num">{{item.waitNum}}</view>
					<view class="business-wait-text">人</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mydata from "../../mock/json.js"
	export default {
		data() {
			return {
				menuList: [{
					"img": "../../static/image/index/menu01.png",
					"title": "个人现金业务",
					"waitNum": 3

				}, {
					"img": "../../static/image/index/menu02.png",
					"title": "个人现金业务",
					"waitNum": 2

				}, {
					"img": "../../static/image/index/menu03.png",
					"title": "个人现金业务",
					"waitNum": 1

				}, {
					"img": "../../static/image/index/menu04.png",
					"title": "个人现金业务",
					"waitNum": 1

				}],
				map1: {},
				array: [{
						'id': '1',
						'name': '越秀区支行',
						'latitude': 23.125363678462882,
						'longitude': 113.26431360839841
					},
					{
						'id': '2',
						'name': '珠江新城区总行',
						'latitude': 23.119048810056466,
						'longitude': 113.32134810089109
					}
				],
				index: 0,
				latitude: 23.1063392366794,
				longitude: 113.32366552947995,
				covers: []
			}
		},
		onLoad() {
			var _this = this
			console.log('onLoad.....')
			//获取用户的唯一id
			// uni.login({
			// 	provider: 'weixin',
			// 	success: function(loginRes) {
			// 		console.log('loginRes.authResult:', loginRes.code);
			// 		_this.sendRequest({
			// 			url: "",
			// 			method: "get",
			// 			data: {
			// 				code: loginRes.code
			// 			},
			// 			hideLoading: false,
			// 			success: function(res) {
			// 				console.log("获取数据:" + JSON.stringify(res));
			// 			}
			// 		})
			// 	}
			// });
		},
		onReady() {
			var _this = this;
			console.log(_this)
			let covers = []
			for (var i = 0; i < _this.array.length; i++) {
				let obj = {}
				obj.width = 31
				obj.height = 31
				obj.iconPath = '../../static/image/index/bank-local.png'
				obj.latitude = _this.array[i].latitude
				obj.longitude = _this.array[i].longitude
				covers.push(obj)
			}
			_this.covers = covers
			this.isGetLocation();
			this.map1 = uni.createMapContext("map1", this)
		},
		methods: {
			appointmentPlate() {
				uni.navigateTo({
					url: '/pages/index/appointment?data=1'
				});
			},
			getPhone() {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: '13786705806',
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
			goHere() {
				console.log("go...")
				var _this = this
				uni.openLocation({
					latitude: _this.latitude,
					longitude: _this.longitude,
					success: function() {
						console.log("ok")
					}
				})
			},
			bindPickerChange(e) {
				const index = e.target.value
				var _this = this;
				_this.longitude = _this.array[index].longitude
				_this.latitude = _this.array[index].latitude
				_this.map1.moveToLocation({
					longitude: _this.array[index].longitude,
					latitude: _this.array[index].latitude
				})
			},
			bindGetUserInfo(e) {
				if (e.detail.userInfo) {
					//用户按了允许授权按钮
					console.log("开始获取了用户的授权信息：", e)
				} else {
					//用户按了拒绝按钮
				}
			},
			getAuthorizeInfo(a = "scope.userLocation") { //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
				var _this = this;
				uni.authorize({
					scope: a,
					success(res) { //1.1 允许授权
						console.log("允许了授权的信息：", res)
						_this.getLocationInfo();
					},
					fail() { //1.2 拒绝授权
						console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			getLocationInfo() { //2. 获取地理位置
				var _this = this;
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						console.log("你的位置是 ：", res)
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						_this.map1.moveToLocation({
							longitude: longitude,
							latitude: latitude
						})
					}
				});
			},
			isGetLocation(a = "scope.userLocation") { // 3. 检查当前是否已经授权访问scope属性，参考下截图
				var _this = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting[a]) { //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							console.log("没有获取授权。。。。")
							_this.getAuthorizeInfo()
						} else {
							console.log("获取地址。。。。")
							_this.getLocationInfo()
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.title-body {
			display: flex;
			align-items: center;
			padding-left: 30rpx;
			background-color: #FFFFFF;

			.title {
				font-size: 20rpx;
				font-weight: normal;
				color: #8B8A8A;
			}

			.title-img {
				width: 24rpx;
				height: 24rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}

			.uni-list-cell {
				display: flex;
				align-items: center;
				.uni-input{
					display: inline-block;
				}

				.title-select-img {
					margin-left: 12rpx;
					width: 16rpx;
					height: 16rpx;
				}
			}
		}

		.map-body {
			background-color: #FFFFFF;
			position: relative;
			padding-top: 30rpx;

			.map1 {
				width: 100%;
				height: 70vh;
				z-index: 888;
			}

			.address-body {
				background-color: rgba(247,247,247, 0.8);
				width: 85%;
				height: 160rpx;
				display: flex;
				align-items: center;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				z-index: 9999;
				bottom: 36rpx;
				border-radius: 25rpx;
				padding-left: 31rpx;
				padding-right: 31rpx;
				display: flex;
				justify-content: space-between;

				.address-btn-group {
					width: 137rpx;
					display: flex;
					justify-content: space-between;

					.address-act {
						display: flex;
						flex-direction: column;
						align-items: center;

						.address-img {
							width: 56rpx;
							height: 56rpx;
						}

						.address-img-div {
							width: 56rpx;
							height: 56rpx;
							border-radius: 50%;
							background: #FFFFFF;
							box-shadow: 0px 7px 21px 0px rgba(107, 99, 99, 0.15);
							display: flex;
							justify-content: center;
							align-items: center;

							.address-phone-img {
								width: 36rpx;
								height: 36rpx;
							}
						}

						.address-act-text {
							margin-top: 10rpx;
							text-align: center;
							width: 56rpx;
							height: 25rpx;
							font-size: 18rpx;
							font-weight: 400;
							color: #FF4C4C;
							line-height: 25rpx;
						}
					}
				}


				.detail-content {
					width: 470rpx;

					.address-text {
						color: #464141;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}

					.time-text {
						margin-top: 16rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						font-size: 22rpx;
						font-weight: 400;
						color: #8B8A8A;
					}
				}


			}
		}

		.business-list {
			margin-top: 40rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			background: linear-gradient(180deg, rgba(247, 247, 247, 0) 0%, #F5F5F5 100%);

			.business-item {
				width: 335rpx;
				height: 180rpx;
				margin-bottom: 22rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 6rpx 30rpx 0rpx rgba(0, 0, 0, 0.08);
				border-radius: 17rpx;
				padding-left: 29rpx;
				padding-top: 42rpx;

				.business-title {
					display: flex;
					align-items: center;

					.business-img {
						width: 50rpx;
						height: 50rpx;
					}

					.business-title-text {
						margin-left: 19rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #464141;
						line-height: 40rpx;
					}
				}

				.business-wait {
					margin-top: 10rpx;
					display: flex;
					align-items: center;

					.business-wait-text {
						font-size: 20rpx;
						font-weight: 400;
						color: #8B8A8A;
						line-height: 28rpx;
					}

					.business-wait-num {
						margin-left: 10rpx;
						margin-right: 10rpx;
						font-size: 40rpx;
						font-weight: 600;
						line-height: 56rpx;
					}
				}
			}

			.business-item:nth-child(1) {
				.business-wait-num {
					color: #FF4C4C;
				}
			}

			.business-item:nth-child(2) {
				.business-wait-num {
					color: #6C86FD;
				}
			}

			.business-item:nth-child(3) {
				.business-wait-num {
					color: #2692FA;
				}
			}

			.business-item:nth-child(4) {
				.business-wait-num {
					color: #FDB53A;
				}
			}
		}
	}
</style>
