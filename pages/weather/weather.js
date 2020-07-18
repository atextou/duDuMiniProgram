// pages/weather/weather.js
Page({
 data: {
    // 地区选择值 
    selectedRegion: ["广东省", "广州市", "海珠区"],
    // 城市id
    cityId: '',
    // 城市实时天气
    now: {},
    date: "",
    time: "",
    // 各项指标值
    indicator: []
  },
// 查询城市id值
getCityId(){
  wx.request({
    url: 'https://geoapi.heweather.net/v2/city/lookup?',
    data: {
      location: this.data.selectedRegion[1],
      key: '*********'
    },
    success:(res)=>{
      console.log("获取id值返回结果"+res)
      this.setData({
        cityId: res.data.location[0].id
      })
      console.log("当前城市id值"+this.data.cityId)
      this.getWeather(this.data.cityId)
    }
  })
},
// 获取城市天气
getWeather(city){
  wx.request({
    url: 'https://devapi.heweather.net/v7/weather/now?',
    data: {
      location: city,
      key: 'b6134264f10f4c9a9db19a9a35a400ca'
    },
    success:(res)=>{
      console.log("获取天气值返回结果")
      console.log(res)
      console.log(res.data.now)
      this.setData({
        now: res.data.now,
        //填充页面数据
        indicator: [
          {
            name: "体感温度",
            val: res.data.now.feelsLike + "°C"
          },
          {
            name: "风向",
            val: res.data.now.windDir
          },{
            name: "风力等级",
            val: res.data.now.windScale + "级"
          },{
            name: "风速",
            val: res.data.now.windSpeed + "Km/h"
          },{
            name: "降水量",
            val: res.data.now.precip + "mm"
          },{
            name: "相对湿度",
            val: res.data.now.humidity + "%"
          },{
            name: "大气压强",
            val: res.data.now.pressure + "KPa"
          },{
            name: "云量",
            val: res.data.now.cloud + "%"
          },{
            name: "能见度",
            val: res.data.now.vis + "Km"
          }
        ]
      })
      //获取响应数据中的 天气更新时间
      let date = this.data.now.obsTime.split("T")[0]
      let time = this.data.now.obsTime.split("T")[1].split("+")[0]
      this.setData({
        date: date,
        time: time
      })
      console.log(date,time)
    }
  })
},


  onLoad(){
    this.getCityId()
  },
  bindRegionChange(e){
    console.log(e.detail.value)
    this.setData({
      selectedRegion: e.detail.value
    })
    console.log(this.data.selectedRegion)
    this.getCityId()
  }
})