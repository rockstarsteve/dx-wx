<template>
	<view class="container">
		<view class="form">
			<view class="menu-fist line">
				<view class="attr">预约类型</view>
				<view class="values">{{menuName}}</view>
			</view>
			<view class="menu-second line" v-if="visibaleSendMenu">
				<view class="attr">二级菜单</view>
				<!-- <view class="values">取现预约</view> -->
				<picker class="uni-list-cell" @change="secondMenuTypePicker" :value="secondMenuIndex" :range="secondMenuList"
				 :range-key="'title'">
					<view class="uni-input">{{secondMenuList[secondMenuIndex].title}}</view>
					<image src="../../static/image/index/select.png" class="title-select-img"></image>
				</picker>
			</view>
			<view class="line">
				<view class="attr">预约方式</view>
				<!-- <view class="values">手机号</view> -->
				<picker class="uni-list-cell" @change="appointmentTypePicker" :value="appointmentTypeIndex" :range="appointmentTypeList"
				 :range-key="'name'">
					<view class="uni-input">{{appointmentTypeList[appointmentTypeIndex].name}}</view>
					<image src="../../static/image/index/select.png" class="title-select-img"></image>
				</picker>
			</view>
			<view class="line">
				<view class="attr">预约日期</view>
				<view class="values values-date">
					<view class="value">
						<biaofun-datetime-picker 
						placeholder="请选择活动时间" 
						:defaultValue="currDate" 
						:start="currDate" 
						end="2030-10-01 08:00"
						 fields="minute" @change="changeDatetimePicker"></biaofun-datetime-picker>
					</view>
					<image src="../../static/image/index/select.png" class="title-select-img"></image>
				</view>
			</view>
			<view class="line">
				<view class="attr">{{appointmentTypeList[appointmentTypeIndex].name}}</view>
				<view class="values"><input type="text" class="card-input" :value="cardInput" @input="setInputVal" focus /></view>
			</view>
			<view class="cleavage-line"></view>

			<view class="outlets">
				<view class="outlets-title outlets-line">
					预约网点信息
				</view>
				<view class="outlets-select outlets-line">
					<view class="outlets-select-title">
						<image src="../../static/image/common/logo_s.png" class="outlets-logo" mode=""></image>
						<view class="">{{deptName}}</view>
					</view>
					<view class="outlets-select-text" @tap="choese">选择</view>
				</view>
				<view class="info-line">
					地址： {{address}}
				</view>
				<view class="info-line">
					电话： {{phone}}
				</view>
				<view class="info-line">
					营业时间： {{businesshours}}
				</view>
			</view>
		</view>
		<view class="sub-btn" @tap="submit">确认提交</view>
	</view>
</template>

<script>
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue'
	export default {
		components: {
			biaofunDatetimePicker
		},
		data() {
			return {
				currDate: '',
				cardInput: '',
				parentMenuId: '',
				appointmentdate: '',
				appointment: '',
				menuName: '',
				deptName: '',
				deptCode: '',
				address: '',
				businesshours: '',
				phone: '',
				visibaleSendMenu: false,
				secondMenuIndex: 0,
				secondMenuList: [],
				appointmentTypeIndex: 0,
				appointmentTypeList: [{
					certificatetype: '16',
					name: '身份证'
				}, {
					certificatetype: '4',
					'name': '银行卡'
				}]
			}
		},
		onLoad: function(option) {
			const _this = this
			let currDate = new Date()
			_this.currDate =  currDate.getFullYear() + '-' + (Number.parseInt(currDate.getMonth()) + 1) + '-' + currDate.getDate() + ' ' 
								+ currDate.getHours() + ':' + currDate.getMinutes()
			_this.parentMenuId = option.menuId
			_this.menuName = option.menuName
			_this.deptName = option.deptName
			_this.deptCode = option.deptCode
			_this.address = option.address
			_this.businesshours = option.businesshours
			_this.phone = option.phone
			_this.appointmentdate = currDate.getFullYear() + '-' + (Number.parseInt(currDate.getMonth()) + 1) + '-' + currDate.getDate()
			_this.appointment = '09-40'
			
			_this.sendRequest({
				url: "/api/getQueueMenus",
				method: "post",
				data: {
					fatherId: _this.parentMenuId,
					code: _this.detpCode
				},
				hideLoading: false,
				success: function(res) {
					if (res.data.length < 1) {
						_this.visibaleSendMenu = false
					} else {
						let tempMenu = []
						for (var i = 0; i < res.data.length; i++) {
							tempMenu.push({
								title: res.data[i].menuname,
								waitNum: res.data[i].waitnum,
								menuId: res.data[i].menuid
							})
						}
						_this.secondMenuList = tempMenu
					}
				}
			})
		},
		methods: {
			changeDatetimePicker(e){
				let _this = this
				_this.appointmentdate = e.f1
				_this.appointment = e.hh + '-' + e.mm
			},
			setInputVal(e) {
				this.cardInput = e.detail.value
			},
			secondMenuTypePicker() {
				var _this = this
				_this.secondMenuIndex = Number.parseInt(e.target.value)
			},
			appointmentTypePicker(e) {
				var _this = this
				_this.appointmentTypeIndex = Number.parseInt(e.target.value)
			},
			submit() {
				const _this = this
				if(!_this.cardInput){
					uni.showModal({
						showCancel: false,
						content: "请输入对应的账号！"
					});
					return
				}
				
				let subData = {
					appointmentdate: _this.appointmentdate,
					appointment: _this.appointment,
					orgcode: _this.deptCode,
					channeltype: '1',
					openid: _this.globalData.token,
				}
				//类型(16/身份证；4/银行卡)
				subData.certificatetype = _this.appointmentTypeList[_this.appointmentTypeIndex].certificatetype
				if (_this.appointmentTypeList[_this.appointmentTypeIndex].certificatetype == '16') {
					subData.certno = _this.cardInput
				} else {
					subData.bankno = _this.cardInput
				}
				// 菜单id
				if (_this.secondMenuList.length < 1) {
					subData.menuid = _this.parentMenuId
				} else {
					subData.menuid = _this.secondMenuList[_this.secondMenuIndex].menuId
				}
				this.sendRequest({
					url: "/api/submitAnAppointment",
					method: "post",
					data: subData,
					hideLoading: false,
					success: function(res) {
						if (res.result == '1') {
							uni.redirectTo({
								url: '/pages/index/appointment-success?menuName=' + _this.menuName + '&date=' + _this.currDate +
									'&bussiType=' +
									_this.appointmentTypeList[_this.appointmentTypeIndex].name + '&bussiCode=' + _this.cardInput +
									'&deptName=' + _this.deptName +
									'&address=' + _this.address + '&businesshours=' + _this.businesshours + '&phone=' + _this.phone
							});
						} else {
							uni.redirectTo({
								url: '/pages/index/appointment-fail'
							});
						}
					}
				})

			},
			choese() {
				uni.navigateBack({
					delta: 1
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
			padding-bottom: 38rpx;
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

					.card-input {
						background-color: #F8F8F8;
						border-radius: 27rpx;
						padding-left: 15rpx;
						padding-right: 15rpx;

					}
				}

				.values-date {
					display: flex;
					align-items: center;

					.title-select-img {
						margin-left: 12rpx;
						width: 16rpx;
						height: 16rpx;
					}
				}

				.uni-list-cell {
					display: flex;
					align-items: top;

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

						view {
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
