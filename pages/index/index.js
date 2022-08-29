Page({
  data: {
    download: '下载',
    url: ``,
    num: 0,
    page: 1,
    id: '',
    caption: '',
    title: 'AlexandrMisko即将为您呈现......'
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  load(){
    this.setData({
      download: '下载中...'
    })
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/video',
      success:(res)=>{
        const fs = wx.getFileSystemManager()
        console.log(res)
        that.setData({
          num: res['data']['data'].length,
          id: res['data']['data'][that.data.page-1]['id'],
          caption: res['data']['data'][that.data.page-1]['caption'],
          title: res['data']['data'][that.data.page-1]['title']
        })
        fs.writeFile({
          filePath: `${wx.env.USER_DATA_PATH}/py.mp4`,
          data: res['data']['data'][that.data.page-1]['video'].slice(2),
          encoding: 'base64',
          success(res) {
            console.log(res)
            that.setData({
              download: '下载',
              url: `${wx.env.USER_DATA_PATH}/py.mp4`
            })
          },
          fail(res) {
            console.error(res)
          }
        })
      }
    })
  },
  bindPlay: function() {
    this.videoContext.play()
  },
  bindPause: function() {
    this.videoContext.pause()
  },
  before(){
    this.setData({
      url: '',
      page: this.data.page-1,
      title: 'AlexandrMisko即将为您呈现......'
    })
  },
  after(){
    this.setData({
      url: '',
      page: this.data.page+1,
      title: 'AlexandrMisko即将为您呈现......',
    })
  },
  download(){
    wx.saveVideoToPhotosAlbum({
      filePath: `${wx.env.USER_DATA_PATH}/py.mp4`,
      success (res) {
        console.log(res.errMsg)
      }
    })
  },
  comment(){
    wx.navigateTo({
      url: '../comment/comment?id='+this.data.id+'&caption='+this.data.caption,
    })
  }
})
