// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type: Boolean,
      default: false
    },
    count:{
      type: Number,
      default: 0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event){
      let like = this.properties.like
      let count = like?this.properties.count-1:this.properties.count+1
      this.setData({
        count: count,
        like: !like
      })
      //点击次数统计传递
      this.triggerEvent("like",{},{})

    }
  }
})
