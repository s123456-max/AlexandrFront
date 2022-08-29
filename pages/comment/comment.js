Page({

  data: {
    list: [],
    caption: ''
  },
  onShow(){
    this.setData({
      caption: this.options.caption
    })
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/comments/'+this.options.id,
      success(res){
        that.setData({
          list: res['data']['data']
        })
      }
    })
  }
})