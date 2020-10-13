Component({
  data: {
    selected: 0,
    color: "#464141",
    selectedColor: "#CDCDCD",
	backgroundColor: "#ffffff",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/static/image/tabar/index.png",
      selectedIconPath: "/static/image/tabar/index.png",
      text: "首页"
    }, {
      pagePath: "/pages/my/my",
      iconPath: "/static/image/tabar/my.png",
      selectedIconPath: "/static/image/tabar/my.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})