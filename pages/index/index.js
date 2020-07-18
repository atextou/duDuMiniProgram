Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 默认头像
    defaultAvatarUrl: '/images/avator.png',
    // 存放用户信息
    userInfo: {},
    // 授权按钮显示默认值
    isShow: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户是否授权
    wx.getSetting({
      // 成功回调
      success: (data) => {
        // 调用获取用户信息的函数
        this.getUserInfo()
      }
    })
  },
  // 获取用户信息函数
  getUserInfo() {
    console.log("getUserInfo()"+this)
    wx.getUserInfo({
      // 成功回调，箭头函数改变函数体内this指向
      // console.log("wx.getUserInfo"+this),
      success:(data) => {
        console.log("success"+this)
        this.setData({
          // 获取用户数据
          userInfo: data.userInfo,
          // 设置授权按钮不显示
          isShow: false
        })
        // 获取用户信息成功之后跳转至下一页面
        wx.redirectTo({
          url: '/pages/direction/direction',
        })
      },
      // 失败回调,可不写
      fail(data) {
        console.log(data)
      }
    })
  },
  // 按钮绑定的回调事件
  bindGetUserInfo(e) {
    // console.log(e)
    // 用户点击按钮后,判断用户点击的是确认还是取消
    if (e.detail.rawData) {
      // 点击了确认,需刷新页面显示用户信息
      this.getUserInfo()
    }
  }
})