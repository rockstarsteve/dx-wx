<template>
	<view class="content">
		<view class="title-body">
			<view class="title">离我最近</view>
			<image src="../../static/logo.png" class="title-img"></image>
			<view class="uni-list-cell">
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array" :range-key="'name'">
						<view class="uni-input">{{array[index].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="map-body">
			<map id="map1" ref="map1" style="width: 100%; height: 500rpx;" :latitude="latitude" :longitude="longitude" :markers="covers"
			 :show-location="true">
			</map>
			<view class="address-body">
				<view class="detail-content">
					<view class="address-text">
						广州市黄浦开发区香雪二路2号
					</view>
					<view class="time-text">
						营业时间：周一到周五8:30-17:30
					</view>
				</view>
				<view class="address-act call" @click="getPhone">
					<image src="../../static/logo.png" class="address-img"></image>
					<view class="address-act-text">电话</view>
				</view>
				<view class="address-act goto" @click="goHere">
					<image src="../../static/logo.png" class="address-img"></image>
					<view class="address-act-text">去这里</view>
				</view>
			</view>
		</view>
		<view class="business-list">
			<view class="business-item" v-for="(item,index) in menuList" :key="index" @click="appointmentPlate">
				<view class="business-title">
					<image src="../../static/logo.png" class="business-img"></image>
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
					"img": "../../static/logo.png",
					"title": "个人现金业务",
					"waitNum": 3

				}, {
					"img": "../../static/logo.png",
					"title": "个人现金业务",
					"waitNum": 2

				}, {
					"img": "../../static/logo.png",
					"title": "个人现金业务",
					"waitNum": 1

				}, {
					"img": "../../static/logo.png",
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
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log('loginRes.authResult:', loginRes.code);
					_this.sendRequest({
						url: "",
						method: "get",
						data: {
							code: loginRes.code
						},
						hideLoading: false,
						success: function(res) {
							console.log("获取数据:" + JSON.stringify(res));
						}
					})
				}
			});
		},
		onReady() {
			var _this = this;
			console.log(_this)
			let covers = []
			for (var i = 0; i < _this.array.length; i++) {
				let obj = {}
				obj.width = 20
				obj.height = 30
				obj.iconPath = '../../static/logo.png'
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
				console.log("跳转页面")
				uni.navigateTo({
					url: '/pages/appointment/appointment-plate?data=1'
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
	.content {
		.title-body {
			display: flex;
			align-items: center;
			padding-left: 30rpx;

			.title {
				font-size: 30rpx;
				font-weight: normal;
				color: black;
			}

			.title-img {
				width: 30rpx;
				height: 30rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}
		}

		.map-body {
			position: relative;

			.address-body {
				background-color: #C0C0C0;
				width: 90%;
				height: 200rpx;
				display: flex;
				align-items: center;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				z-index: 999;
				bottom: -100rpx;


				.detail-content {
					.address-text {}

					.time-text {}
				}

				.address-act {
					display: flex;
					flex-direction: column;
					align-items: center;

					.address-img {
						width: 50rpx;
						height: 50rpx;
					}

					.address-act-text {
						font-size: 25rpx;
					}
				}
			}
		}

		.business-list {
			margin-top: 150rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.business-item {
				width: 320rpx;
				height: 200rpx;
				background-color: pink;
				margin-bottom: 40rpx;

				.business-title {
					display: flex;

					.business-img {
						width: 50rpx;
						height: 50rpx;
					}

					.business-title-text {}
				}

				.business-wait {
					display: flex;

					.business-wait-text {}
				}
			}
		}
	}
</style>
