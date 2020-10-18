<template>
	<view class="my-appointment">
		<view v-for="(item,index) in dataList" :key="index" class="item">
			<view class="item-left">
				<view class="left-title" :class="isAct?'use-left-title':'unuse-left-title'">
					{{item.menuname}}
				</view>
				<view class="left-date data-address-text" :class="isAct?'use-left-date':'unuse-left-date'">
					<view class="data-address">
						{{item.orgname}}
					</view>
				</view>
				<view class="left-date" :class="isAct?'use-left-date':'unuse-left-date'">
					预约日期：{{item.appointmentdate}}
				</view>
			</view>
			<view class="btn" @tap="info(item.id,isAct)" :class="isAct?'use-btn':'unuse-btn'">
				预约详情
			</view>
		</view>
		<view class="no-data" v-if="dataList.length < 1">
			<image src="../../static/image/my/no-data.png" class="no-data-img" mode=""></image>
			<view class="no-data-text">
				当前没有记录
			</view>
			<view class="btn" @tap="toIndex">
				去预约
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
		props:{
			isAct: {
				type: Boolean,
				default: false
			},
			dataList: {
				type: Array,
				require: true
			},
		},
		methods: {
			toIndex(){
				uni.switchTab({
				  url: '/pages/index/index'
				})
			},
			info(id,isAct){
				if(isAct){
					console.log("is   id :" + id)
					uni.navigateTo({
						url: '/pages/my/appointment-info?id=' + id,
					});
				}else{
					return
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-appointment{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 40rpx;
		.item{
			width: 690rpx;
			height: 200rpx;
			border-radius: 20rpx;
			background: #FFFFFF;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 40rpx;
			padding-right: 40rpx;
			.item-left{
				display: flex;
				flex-direction: column;
				.left-title{
					font-size: 30rpx;
					font-weight: 600;
					color: #464141;
				}
				.left-date{
					margin-top: 10rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #8B8A8A;
				}
				.data-address-text{
					display: flex;
					.data-address{
						padding-left: 8rpx;
						padding-right: 8rpx;
						line-height: 40rpx;
						border-radius: 8px;
						border: 1px solid #C4C4C4;
					}
				}
				.unuse-left-title{
					color: #8B8A8A;
				}
				.unuse-left-date{
					color: #C4C4C4;
				}
			}
			.btn{
				width: 140rpx;
				height: 50rpx;
				text-align: center;
				background: linear-gradient(104deg, #FF9595 0%, #FF4E5B 100%);
				border-radius: 32rpx;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 50rpx;
				font-size: 24rpx;
			}
			.use-btn{
				box-shadow: 0rpx 9rpx 15rpx 0rpx rgba(249, 86, 86, 0.25);
			}
			.unuse-btn{
				background: #E3E3E3;
			}
		}
		.no-data{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.no-data-img{
				margin-top: 182rpx;
				width: 290rpx;
				height: 290rpx;
			}
			.no-data-text{
				text-align: center;
				font-size: 26rpx;
				font-weight: 600;
				color: #464141;
			}
			.btn{
				margin-top: 60rpx;
				width: 200rpx;
				height: 70rpx;
				background: linear-gradient(104deg, #FF9595 0%, #FF4E5B 100%);
				box-shadow: 0rpx 11rpx 19rpx 0rpx rgba(249, 86, 86, 0.25);
				border-radius: 40rpx;
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 70rpx;
			}
		}
	}
</style>
