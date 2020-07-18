// pages/dictionary/dictionary.js
// 导入vant toast组件
import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    // 搜索框输入值
    searchInputValue: '',
    // 搜索结果
    searchResult: []
  },
  // 点击搜索框，清空搜索框内容和结果数据
  startSearch(e) {
    this.setData({
      searchInputValue: '',
      searchResult: ''
    })
  },
  // 搜索框内容变化函数，动态赋值给searchInputValue
  searchInputChange(e) {
    this.setData({
      searchInputValue: e.detail
    })
  },
  // 搜索单词函数
  goSearchWord(e) {
    // 判断输入值是否为空
    if (!this.data.searchInputValue) {
      Toast.fail('请输入内容');
      return
    }
    wx.request({
      // 请求接口
      url: 'https://api.tianapi.com/txapi/enwords/index?',
      data: {
        // 参数：密钥+查询词汇
        key: '*******（天行接口appkey）',
        word: this.data.searchInputValue
      },
      // 请求成功回调函数
      success: (res) => {
        // console.log(res)
        // 查看返回状态，250：数据返回为空
        if (res.data.code == 250) {
          Toast('哎哟没有这个词啦');
          return
        }
        // 成功获取返回结果
        this.setData({
          // 返回结果为由|拼接的多个字符串
          searchResult: res.data.newslist[0].content.split('|'),
        })
        // console.log(res.data.newslist[0].content)
      },
      // 接口失败回调
      fail: (res) => {
        Toast('出错啦！抱歉呀我们的锅~')
      }
    })
  },
  goHome() {
    wx.redirectTo({
      url: '/pages/direction/direction',
    })
  }
})