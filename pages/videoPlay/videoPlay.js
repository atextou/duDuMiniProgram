// pages/videoPlay/videoPlay.js
// 产生随机颜色函数
function getRandomColor() {
  let str = '#'
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  for (let i = 0; i < 6; i++) {
    let index = parseInt(Math.random() * 16)
    str += arr[index]
  }
  return str
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // video组件 视频播放地址
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    // 视频列表
    videoList: [
      {
        name: '辛特尔',
        url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        region: '荷兰'
      },
      {
        name: '辛特尔',
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        region: '荷兰'
      },
      {
        name: '辛特尔',
        url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        region: '荷兰'
      },
      {
        name: '辛特尔',
        url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        region: '荷兰'
      }
    ],
    // 弹幕文本
    danMuWord: '',
    // 弹幕输入框内容
    inputValue: ''
  },
  // 点击视频列表中的某一项，开启视频播放
  playVideo(e) {
    // 暂停原视频播放
    this.ctx.stop()
    // 设置video视频播放路径
    this.setData({
      src: e.currentTarget.dataset.url
    }),
      // 开启视频播放
      this.ctx.play()
    // console.log("点击了视频列表" + this.data.src)
  },
  // 获取弹幕区域文本框输入内容
  getDanmu(e) {
    this.setData({
      danMuWord: e.detail.value
    })
  },
  // 点击发送弹幕按钮的响应触发事件
  sendDanmu(e) {
    // 获得弹幕内容
    let text = this.data.danMuWord
    // 调用上下文对象上的发送弹幕方法
    this.ctx.sendDanmu({
      // 传递参数： 弹幕文本 & 弹幕颜色(随机颜色)
      text: text,
      color: getRandomColor()
    })
    // 清空文本框内容
    this.setData({
      inputValue: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 创建上下文对象
    this.ctx = wx.createVideoContext("vdeo")
  }
})