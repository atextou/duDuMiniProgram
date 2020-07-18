// pages/direction/direction.js
Page({
  goWeather(){
    wx.navigateTo({
      url: '/pages/weather/weather',
    })
  },
  goVideo(){
    wx.navigateTo({
      url: '/pages/videoPlay/videoPlay',
    })
  },
  goTrans(){
    wx.switchTab({
      url: '/pages/wordTranslate/wordTranslate',
    })
  
  }
})