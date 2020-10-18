<template>
	<view class="content">
		<view class="tabs">
			<scroll-horizontal-tab :tabBars="tabBars" @onTabTap="onTabTap" :tabIndexInit="0"></scroll-horizontal-tab>
		</view>
		<view class="dta-list">
			<my-appointment :dataList="unuseList" :isAct="true" v-if="curr==1"></my-appointment>
			<my-appointment :dataList="usedList" :isAct="false" v-if="curr==2"></my-appointment>
			<my-appointment :dataList="overdueUseList" :isAct="false" v-if="curr==3"></my-appointment>
			<my-appointment :dataList="cancelUseList" :isAct="false" v-if="curr==4"></my-appointment>
		</view>
	</view>
</template>

<script>
	import scrollHorizontal from "@/components/scroll-horizontal-tab/scroll-horizontal-tab.vue"
	import myAppointment from "@/components/my-appointment/my-appointment.vue"
	export default {
		components: {
			scrollHorizontal,myAppointment
		},
		data() {
			return {
				value: '',
				curr: 1,
				tabBars: [
					{name: '未使用',id: '1'},
					{name: '已使用',id: '2'},
					{name: '已过期',id: '3'},
					{name: '已取消',id: '4'},
				],
				unuseList: [],
				usedList: [],
				overdueUseList: [],
				cancelUseList: []
			}
		},
		onShow(e) {
			const _this = this
			_this.sendRequest({
				url: "/api/getsysTakequeuenum",
				method: "post",
				data: {
					openid: _this.globalData.token,
				},
				hideLoading: false,
				success: function(res) {
					if(res.data.length>0){
						let tempunuseList = []
						let tempusedList = []
						let tempoverdueUseList = []
						let tempcancelUseList = []
						for (let i = 0; i < res.data.length; i++) {
							if(res.data[i].numberstatus == 0){
								tempcancelUseList.push({
									id : res.data[i].id,
									menuname: res.data[i].menuname,
									orgname: res.data[i].orgname,
									appointmentdate: res.data[i].appointmentdate,
									
								})
							}else if(res.data[i].numberstatus == 1){
								tempunuseList.push({
									id : res.data[i].id,
									menuname: res.data[i].menuname,
									orgname: res.data[i].orgname,
									appointmentdate: res.data[i].appointmentdate,
									
								})
							}else if(res.data[i].numberstatus == 2){
								tempusedList.push({
									id : res.data[i].id,
									menuname: res.data[i].menuname,
									orgname: res.data[i].orgname,
									appointmentdate: res.data[i].appointmentdate,
									
								})
							}else{
								tempoverdueUseList.push({
									id : res.data[i].id,
									menuname: res.data[i].menuname,
									orgname: res.data[i].orgname,
									appointmentdate: res.data[i].appointmentdate,
									
								})
							}
						}
						_this.unuseList = tempunuseList
						_this.usedList = tempusedList
						_this.overdueUseList = tempoverdueUseList
						_this.cancelUseList = tempcancelUseList
					}
				}
			})
		},
		methods: {
			onTabTap(item) {
				this.curr = item.id
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		padding-top: 8vh;

		.tabs {
			padding-top: 2vh;
			background-color: #FFFFFF;
			position: fixed;
			top: 0;
			left: 0;
		}

		.dta-list {
			height: 92vh;
			overflow-y: scroll;
		}
	}
</style>
