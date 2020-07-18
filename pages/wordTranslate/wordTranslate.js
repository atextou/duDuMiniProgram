// pages/wordTranslate/wordTranslate.js
// 导入md5文件
const MD5 = require('../../utils/md5.js')
Page({
  data: {
    inputValue: '',
    // 选择器可选内容
    lang: [
      {
        name: '自动检测',
        code: 'auto'
      },
      {
        name: '中文',
        code: 'zh'
      },
      {
        name: '英语',
        code: 'en'
      },
      {
        name: '粤语',
        code: 'yue'
      },
      {
        name: '文言文',
        code: 'wyw'
      },
      {
        name: '日语',
        code: 'jp'
      },
      {
        name: '韩语',
        code: 'kor'
      },
      {
        name: '法语',
        code: 'fra'
      },
      {
        name: '西班牙语',
        code: 'spa'
      },
      {
        name: '泰语',
        code: 'th'
      },
      {
        name: '葡萄牙语',
        code: 'pt'
      },
      {
        name: '希腊语',
        code: 'el'
      },
      {
        name: '阿拉伯语',
        code: 'ara'
      },
      {
        name: '德语',
        code: 'de'
      },
      {
        name: '荷兰语',
        code: 'nl'
      },
      {
        name: '俄语',
        code: 'ru'
      },
      {
        name: '意大利语',
        code: 'it'
      },
      {
        name: '波兰语',
        code: 'pl'
      },
      {
        name: '保加利亚语',
        code: 'bul'
      },
      {
        name: '爱沙尼亚语',
        code: 'est'
      },
      {
        name: '丹麦语',
        code: 'dan'
      },
      {
        name: '捷克语',
        code: 'cs'
      },
      {
        name: '芬兰语',
        code: 'fin'
      },
      {
        name: '罗马尼亚语',
        code: 'rom'
      },
      {
        name: '斯洛文尼亚语',
        code: 'slo'
      },
      {
        name: '瑞典语',
        code: 'swe'
      },
      {
        name: '匈牙利语',
        code: 'hu'
      },
      {
        name: '繁体中文',
        code: 'cht'
      },
      {
        name: '越南语',
        code: 'vie'
      }
    ],
    // 翻译语言（默认第一项）
    fromName: '自动检测',
    fromCode: 'auto',
    // 目标语言（不可设置为自动检测）
    toName: '中文',
    toCode: 'zh',
    // 翻译结果
    trans_result: ''
  },
  // 获取要翻译的语种
  langPickerLeftChange(e){
    // 获取选取的语种索引
    let index = e.detail.value
    this.setData({
      // 根据索引获取语种名称及代码
      fromName: this.data.lang[index].name,
      fromCode: this.data.lang[index].code
    })
  },
  // 获取翻译目标语种
  langPickerRightChange(e){
    // 获取选取的语种索引
    let index = e.detail.value
    this.setData({
      // 根据索引获取语种名称及代码
      toName: this.data.lang[index].name,
      toCode: this.data.lang[index].code
    })
  },
  // 动态获取输入框文本
  getTransWords(e){
    // console.log(e)
    this.setData({
      inputValue: e.detail
    })
  },
  cancelInput(e){
    console.log('gfvc')
    this.setData({
      inputValue: ''
    })
  },
  // 点击翻译按钮触发的事件
  goSearch(e) {
    // console.log(e)
    let query = this.data.inputValue
    let salt = (new Date).getTime()
    let key = '百度翻译api密钥'
    let appid = '百度翻译appid'
    let str = appid + query + salt + key
    let sign = MD5(str)
    let to = this.data.toCode
    //判断翻译目标语言picker选择的值是否为自动检测
    if(to == 'auto'){
     //是，设置为中文（接口不允许目标语言设置为auto）
     let to = 'zh'
     this.setData({
       toName: '中文'
     })
    }
    wx.request({
      url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
      data: {
        q: query,
        from: this.data.fromCode,
        to: to,
        appid: appid,
        salt: salt,
        sign: sign
      },
      success: (res) => {
        console.log(res)
        // console.log(this.data.lang)
        // arr.find(item => item.key === value)  查找arr中 key的值为value 的 item对象
        // 参数：对象 返回值：目标对象，方法内语句为判断参数
        let name = this.data.lang.find(item => item.code === res.data.from).name
        this.setData({
          fromName: name,
          trans_result: res.data.trans_result[0].dst
        })
        console.log(res.data.trans_result[0].dst)
      }
    })
    // console.log()
  },
  // 二次输入时清空翻译结果
  reInput(e) {
    this.setData({
      trans_result: ''
    })
  },
  goHome(){
    wx.redirectTo({
      url: '/pages/direction/direction',
    })
  }
})