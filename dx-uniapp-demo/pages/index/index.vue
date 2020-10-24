<template>
	<view class="container">
		<view class="title-body">
			<view class="title" @tap="goLimte">离我最近</view>
			<image src="../../static/image/index/local.png" class="title-img"></image>
			<view>
				<picker class="uni-list-cell" @change="bindPickerChange" :value="deptIndex" :range="deptList" :range-key="'name'">
					<view class="uni-input">{{deptList[deptIndex].name}}</view>
					<image src="../../static/image/index/select.png" class="title-select-img"></image>
				</picker>
			</view>
		</view>
		<view class="container-body">
			<view class="map-body">
				<view class="map-content">
					<map id="map1" ref="map1" class="map1" :latitude="latitude" :longitude="longitude" :markers="covers"
					 :show-location="true">
					</map>
				</view>
				<view class="address-body">
					<view class="detail-content">
						<view class="address-text">
							{{address}}
						</view>
						<view class="time-text">
							营业时间：{{businesshours}}
						</view>
					</view>
					<view class="address-btn-group">
						<view class="address-act call" @tap="getPhone(phone)">
							<view class="address-img-div">
								<image src="../../static/image/index/phone.png" class="address-phone-img"></image>
							</view>
							<view class="address-act-text">电话</view>
						</view>
						<view class="address-act goto" @tap="goHere(latitude,longitude)">
							<image src="../../static/image/index/tomap.png" class="address-img"></image>
							<view class="address-act-text">去这儿</view>
						</view>
					</view>
				</view>
			</view>
			<view class="business-list">
				<view class="business-item" v-for="(item,index) in menuList" :key="index" @tap="appointmentPlate(item.menuId,item.title)">
					<view class="business-title">
						<!-- <image :src="item.img" class="business-img"></image> -->
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
					"waitNum": 0

				}, {
					"img": "../../static/image/index/menu02.png",
					"title": "个人现金业务",
					"waitNum": 0

				}, {
					"img": "../../static/image/index/menu03.png",
					"title": "个人现金业务",
					"waitNum": 0

				}, {
					"img": "../../static/image/index/menu04.png",
					"title": "个人现金业务",
					"waitNum": 0

				}],
				map1: {},
				deptList: [],
				deptIndex: 0,
				deptCode: '',
				deptName: '',
				address: '',
				businesshours: '',
				phone: '',
				latitude: 31.40527,
				longitude: 121.48941,
				covers: [],

			}
		},
		onLoad() {
			var _this = this
			// 获取用户的唯一id
			uni.login({
				provider: 'weixin',
				success: function(res) {
					_this.sendRequest({
						url: "/api/getOpenId",
						method: "post",
						heads: 'application/x-www-form-urlencoded',
						data: {
							wxcode: res.code
						},
						hideLoading: false,
						success: function(res) {
							if (res.data.openid) {
								_this.globalData.token = res.data.openid;
							} else {
								uni.showModal({
									showCancel: false,
									content: "暂无法提供服务"
								});
							}
						}
					})
				}
			});
		},
		onReady() {
			var _this = this;
			//获取机构列表
			_this.sendRequest({
				url: "/api/getSysOffice",
				method: "post",
				data: {},
				hideLoading: false,
				success: function(res) {
					let covers = []
					let tempArray = []
					for (var i = 0; i < res.data.length; i++) {
						//地图位置
						let obj = {}
						obj.width = 31
						obj.height = 31
						obj.iconPath = '../../static/image/index/bank-local.png'
						obj.latitude = res.data[i].latitude
						obj.longitude = res.data[i].longitude
						//机构
						let obj2 = {}
						obj2.id = res.data[i].id
						obj2.code = res.data[i].code
						obj2.latitude = res.data[i].latitude
						obj2.longitude = res.data[i].longitude
						obj2.businesshours = res.data[i].businesshours
						obj2.phone = res.data[i].phone
						obj2.address = res.data[i].address
						obj2.name = res.data[i].name
						covers.push(obj)
						tempArray.push(obj2)
					}
					//初始化数据
					_this.covers = covers
					_this.deptList = tempArray
					_this.goLocation()
					_this.map1 = uni.createMapContext("map1", _this)
					_this.latitude = tempArray[0].latitude
					_this.longitude = tempArray[0].longitude
					_this.businesshours = tempArray[0].businesshours
					_this.phone = tempArray[0].phone
					_this.address = tempArray[0].address
					_this.deptCode = tempArray[0].code
					_this.deptName = tempArray[0].name
					//机构菜单数据
					_this.setMenuData(_this.deptCode)
				}
			})
		},
		methods: {
			getDistance(lon1, lat1, lon2, lat2) {
				lon1 = Number.parseFloat(lon1)
				lat1 = Number.parseFloat(lat1)
				lon2 = Number.parseFloat(lon2)
				lat2 = Number.parseFloat(lat2)
				const PI = 3.14159265358979323
				const R = 6371229
				let x, y, distance;
				let lonres = lon1 > lon2 ? lon1 - lon2 : lon2 - lon1;
				let latres = lat1 > lat2 ? lat1 - lat2 : lat2 - lat1;
				x = (lonres) * PI * R * Math.cos(((lat1 + lat2) / 2) * PI / 180) / 180;
				y = (lat2 - lat1) * PI * R / 180;
				console.log(Math.hypot(x, y))
				return distance = Math.hypot(x, y);
			},
			goLimte() {
				const R = 6371229
				let _this = this
				console.log("切换最近。。。 ")
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						console.log("deptList：", _this.deptList)
						let dis = 2 * R
						let limtIndex = 0
						for (let index in _this.deptList) {
							let tempDis = _this.getDistance(longitude, latitude, _this.deptList[index].longitude, _this.deptList[index].latitude)							if (tempDis < dis) {								dis = tempDis								limtIndex = index							}
						}
						//切换选择的机构
						_this.deptIndex = limtIndex
						_this.deptCode = _this.deptList[limtIndex].code
						_this.deptName = _this.deptList[limtIndex].name
						_this.address = _this.deptList[limtIndex].address
						_this.businesshours = _this.deptList[limtIndex].businesshours
						_this.phone = _this.deptList[limtIndex].phone
						_this.latitude = _this.deptList[limtIndex].latitude
						_this.longitude = _this.deptList[limtIndex].longitude
						
						//切换地图位置
						_this.map1.moveToLocation({
							longitude: _this.deptList[limtIndex].longitude.longitude,
							latitude: _this.deptList[limtIndex].longitude.latitude
						})
					},
					fail() {
						uni.showToast({
							title: '暂无权限获取您的位置。',
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			setMenuData(detpCode) {
				const _this = this
				this.sendRequest({
					url: "/api/getQueueMenus",
					method: "post",
					data: {
						fatherId: '0',
						code: detpCode
					},
					hideLoading: false,
					success: function(res) {
						if (res.data.length < 1) {

						} else {
							let tempMenu = []
							for (var i = 0; i < res.data.length; i++) {
								tempMenu.push({
									title: res.data[i].menuname,
									waitNum: res.data[i].waitnum,
									menuId: res.data[i].menuid
								})
							}
							_this.menuList = tempMenu
						}
					}
				})
			},
			appointmentPlate(menuId, menuName) {
				const _this = this
				if (!menuId) {
					uni.showModal({
						content: "服务暂不可用"
					});
					return
				}
				uni.navigateTo({
					url: '/pages/index/appointment?menuId=' + menuId + '&menuName=' + menuName + '&deptName=' + _this.deptList[_this
							.deptIndex].name +
						'&deptCode=' + _this.deptList[_this.deptIndex].code + '&address=' + _this.address + '&businesshours=' + _this.businesshours +
						'&phone=' + _this.phone
				});
			},
			getPhone(phone) {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: phone,
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
			goHere(latitude, longitude) {
				var _this = this
				uni.openLocation({
					latitude: _this.latitude,
					longitude: _this.longitude,
					success: function() {
						console.log("地图切换地点ok")
					},
					fail() {
						console.log("地图切换地点失败。。")
					}
				})
			},
			bindPickerChange(e) {
				var _this = this
				_this.deptIndex = Number.parseInt(e.target.value)
				_this.map1.moveToLocation({
					longitude: _this.deptList[_this.deptIndex].longitude,
					latitude: _this.deptList[_this.deptIndex].latitude
				})
				_this.latitude = _this.deptList[_this.deptIndex].latitude
				_this.longitude = _this.deptList[_this.deptIndex].longitude
				_this.businesshours = _this.deptList[_this.deptIndex].businesshours
				_this.phone = _this.deptList[_this.deptIndex].phone
				_this.address = _this.deptList[_this.deptIndex].address
				_this.name = _this.deptList[_this.deptIndex].name
				_this.deptCode = _this.deptList[_this.deptIndex].code
				_this.setMenuData(_this.deptCode)
			},
			getAuthorizeInfo(a = "scope.userLocation") { //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
				var _this = this;
				uni.authorize({
					scope: a,
					success(res) { //1.1 允许授权
						console.log("允许了授权的信息：", res)
						_this.goLocation();
					},
					fail() { //1.2 拒绝授权
						uni.showToast({
							title: '暂无权限获取您的位置',
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			goLocation() { //2. 获取地理位置
				var _this = this;
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						_this.map1.moveToLocation({
							longitude: longitude,
							latitude: latitude
						})
					},
					fail() {
						uni.showToast({
							title: '暂无权限获取您的位置',
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		padding-top: 5vh;

		.title-body {
			display: flex;
			align-items: center;
			padding-left: 30rpx;
			background-color: #FFFFFF;
			position: fixed;
			left: 0;
			top: 0;
			height: 5vh;
			width: 100%;


			.title {
				font-size: 26rpx;
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

				.uni-input {
					display: inline-block;
					font-size: 26rpx;
					font-weight: 500;
					color: #464141;
				}

				.title-select-img {
					margin-left: 12rpx;
					width: 16rpx;
					height: 16rpx;
				}
			}
		}

		.container-body {
			height: 95vh;
			overflow-y: scroll;
			position: relative;

			.map-body {
				background-color: #FFFFFF;
				position: relative;
				width: 100%;
				height: 70vh;

				.map1 {
					width: 100%;
					height: 70vh;
					z-index: 888;
				}

				.address-body {
					background-color: rgba(247, 247, 247, 0.9);
					width: 95%;
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
					padding-top: 42rpx;

					.business-title {
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;

						.business-img {
							width: 50rpx;
							height: 50rpx;
						}

						.business-title-text {
							font-size: 30rpx;
							font-weight: 600;
							color: #464141;
							line-height: 40rpx;
						}
					}

					.business-wait {
						margin-top: 10rpx;
						display: flex;
						align-items: center;
						justify-content: center;

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


	}
</style>
