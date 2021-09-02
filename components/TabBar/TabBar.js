// components/TabBar/TabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabBarList: {
      type: Array
    },
    tabBarData: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
      // 传递参数到父组件
      this.triggerEvent("changeIndex", this.data.currentIndex);
    }
  }
})
