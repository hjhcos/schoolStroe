import {getOrderList, getPendingOrder, getPendingOrderByCurrentUser, getReceivedOrderByCurrentUser} from '../../BBL.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.statu == '0'){
      wx.setNavigationBarTitle({title: '待发货'})
      getPendingOrderByCurrentUser().then((res)=>{this.setData({'orderList': res.data})})
    }else if(options.statu == '1'){
      wx.setNavigationBarTitle({title: '待收货'})
      getReceivedOrderByCurrentUser().then((res)=>{this.setData({'orderList': res.data})})
    } else{
      wx.setNavigationBarTitle({title: '全部订单'})
      getOrderList().then((res)=>{this.setData({'orderList': res.data})})
    }
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