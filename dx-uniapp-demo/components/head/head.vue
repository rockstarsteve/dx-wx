<template>
	<view class="head" :style="{ height: height + 'vh'}">
		<view class="back" @tap="back" :style="{top: top + 'px'}">
			<image src="../../static/image/my/back-btn-img.png" class="back-img" mode=""></image>
		</view>
		<view class="title" v-if="titleShow" :style="{
				top: top + 'px',
				color:color,
				'font-size': size + 'rpx'
			}">{{title}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '自定义标题'
			},
			size: {
				type: String,
				default: '32'
			},
			color: {
				type: String,
				default: '#000'
			},
			titleShow: {
				type: Boolean,
				default: true
			},
			backShow: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				height: 25,
				top: 0,
			}
		},
		created() {
			//设备信息
			let app = uni.getSystemInfoSync();
			//胶囊信息
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// this.height  = app.statusBarHeight + menuButtonInfo.height + (menuButtonInfo.top - app.statusBarHeight)*2
			this.top = menuButtonInfo.top;
		},
		methods: {
			back() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		position: fixed;
		top: 0;
		width: 750rpx;
		z-index: 999;
		background-image: url(../../static/image/my/top-bg.png);
		background-size: 100% 100%;
	}

	.title {
		position: fixed;
		width: 750rpx;
		text-align: center;
		line-height: 32px;
		height: 32px;
	}

	.back {
		position: fixed;
		width: 64rpx;
		height: 64rpx;
		z-index: 9;
		left: 29rpx;
		border-radius: 32px;
		border: 1px solid rgba(0, 0, 0, 0.08);
		display: flex;
		justify-content: center;
		align-items: center;
		.back-img{
			width: 34rpx;
			height: 34rpx;
		}
	}
</style>
