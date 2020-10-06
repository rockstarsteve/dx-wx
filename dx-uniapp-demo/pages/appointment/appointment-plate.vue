<template>
	<view>
		<view class="" @click="make">
				办理业务
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option) {
			console.log('option:',option)
		},
		methods: {
			make(){
				uni.redirectTo({
				    url: '/pages/appointment/appointment-success'
				});
			}
		}
	}
</script>

<style>

</style>
