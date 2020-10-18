import Vue from 'vue'

//登录存储的数据key
Vue.prototype.siteBaseUrl = 'http://localhost:8082/applets';
Vue.prototype.sessionKey = "sess_jk";

Vue.prototype.sendRequest = function(param, backpage, backtype) {
	var _self = this,
		url = param.url,
		method = param.method,
		heads = param.heads,
		data = param.data || {},
		token = "",
		hideLoading = param.hideLoading || false;

	//拼接完整请求地址
	var requestUrl = this.siteBaseUrl + url;
	//固定参数:仅仅在小程序绑定页面通过code获取token的接口默认传递了参数token = login
	// if(!data.token){//其他业务接口传递过来的参数中无token
	//     token = uni.getStorageSync(this.sessionKey);//参数中无token时在本地缓存中获取
	//     console.log("当前token:" + token);
	//     if(!token){//本地无token需重新登录(退出时清缓存token)
	//         _self.login(backpage, backtype);
	//         return;
	//     }else{
	//         data.token = token;
	//     }
	// }
	var timestamp = Date.parse(new Date()); //时间戳
	// data["timestamp"] = timestamp;
	// #ifdef MP-WEIXIN
	// data["device"] = "wxapp";
	// data["ver"] = "1.0.0";
	// #endif
	// #ifdef APP-PLUS || H5
	// data["device"] = "iosapp";
	// data["ver"] = "1.0.0";
	// #endif

	//根据传入的header进行设置，默认header: {'content-type' : "application/x-www-form-urlencoded"}
	if (heads) {
		heads = {
			'content-type': heads
		};
	} else {
		heads = {
			'content-type': "application/x-www-form-urlencoded"
		};
	}
	//用户交互:加载圈
	if (!hideLoading) {
		uni.showLoading({
			title: '加载中...'
		});
	}

	//网络请求
	
	uni.request({
		url: requestUrl,
		method: method,
		header: heads,
		data: data,
		success: res => {
			console.log('》》》》》请求路径是：', requestUrl,'请求参数是：', data,'头部：',heads ,'请求类型：',method,'返回数据:' ,res)
			if (res.statusCode && res.statusCode != 200) { //api错误
				uni.showModal({
					content: "" + res.errMsg
				});
				return;
			}
			if (res.data.result) {
				if (res.data.result != "1") {
					uni.showModal({
						showCancel: false,
						content: "" + res.data.msg
					});
					return;
				}
			} 
			typeof param.success == "function" && param.success(res.data);
		},
		fail: (e) => {
			console.log("网络请求fail:" + JSON.stringify(e));
			uni.showModal({
				content: "系统正在升级中。。。暂时无法提供服务"
			});
			typeof param.fail == "function" && param.fail(e.data);
		},
		complete: () => {
			if (!hideLoading) {
				uni.hideLoading();
			}
			// typeof param.complete == "function" && param.complete();
			// return;
		}
	});
}
