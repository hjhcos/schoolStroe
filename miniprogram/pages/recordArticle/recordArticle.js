import { uploadFile, addArticleInfo } from "../../BBL.js";
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {
      name: '',
      price: '',
      type: '',
      picture: '',
      des: ''
    },
    picture: '', // 用于验证商品的图片是否上传到服务器
    openTypeSelect: false,
    articleTypeList: ['饮料', '零食', '生活用品', '烟酒']
  },

  uploading(e) {
    let article = this.data.article;
    if (article.picture == this.data.picture) {
      if (article.name && article.price && article.type && article.picture) {
        let pictureName = [new util.GUID().newGUID(), util.getFileSuffix(article.picture)].join('.');
        let picturePath = 'bbuStore/' + pictureName;
        uploadFile(picturePath, article.picture)
          .then((res) => {
            console.info(res.errMsg);
            this.setData({
              "article.price": parseFloat(article.price).toFixed(2),
              "article.picture": res.fileID,
              "article.num": 0
            })
            addArticleInfo(this.data.article)
              .then((res) => {
                console.info(res.errMsg);
                wx.showModal({
                  title: '上传成功',
                  content: '是否继续上传商品数据',
                  cancelText: '否',
                  confirmText: '继续',
                  confirmColor: '#07c160',
                }).then((res) => {
                  if (res.confirm) {
                    wx.navigateTo({ url: '/pages/store/recordArticle' });
                  } else if (res.cancel) {
                    wx.navigateBack({ delta: 1 })
                  }
                })
              })
              .catch((res) => {
                console.info(res.errMsg);
                wx.showModal({
                  showCancel: false,
                  title: '上传失败',
                  content: '请重新上传商品数据'
                })
              })
          })
          .catch((res) => {
            console.info(res.errMsg);
            wx.showModal({
              showCancel: false,
              content: '请重新上传数据'
            })
          })
      } else {
        wx.showToast({
          title: '商品信息没有填全！',
          icon: 'error',
          duration: 2000,
          mask: true,
        })
      }
    } else {
      wx.showToast({
        title: '已经上传过！',
        icon: 'error',
        duration: 2000,
        mask: true,
      })
    }
  },

  onChange(e) {
    let name = e.currentTarget.dataset.name;
    if (name == 'image') {
      this.setData({
        'picture': e.detail.file.url,
        'article.picture': e.detail.file.url
      })
    }
    else if (name == 'name') {
      this.setData({
        'article.name': e.detail
      })
    }
    else if (name == 'price') {
      this.setData({
        'article.price': e.detail
      })
    }
    else if (name == 'type') {
      if (e.type == "tap") {
        this.setData({
          'openTypeSelect': true
        })
      }
      else if (e.type == "cancel") {
        this.setData({
          'openTypeSelect': false
        })
      }
      else if (e.type == "confirm") {
        this.setData({
          'article.type': e.detail.value,
          'openTypeSelect': false
        })
      }

    }
    else if( name == 'des'){
      this.setData({
        'article.des': e.detail
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})