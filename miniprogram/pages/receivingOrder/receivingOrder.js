import { getPendingOrder, getReceiveingOrder } from '../../BBL.js'

Page({
  data: {
    active: 0,
    pendOrderList: [
      {
        _id: '123456789',
        num: 4,
        orderDate: '2021/10/23 12:20:00',
        addr: '9612',
        previewImage: 'https://img0.baidu.com/it/u=1090803740,1296452137&fm=26&fmt=auto'
      }
    ],
    receiveOrderList: [
      {
        _id: '123456789',
        num: 4,
        orderDate: '2021/10/23 12:20:00',
        addr: '9612',
        previewImage: 'https://img0.baidu.com/it/u=1090803740,1296452137&fm=26&fmt=auto',
        receiveTime: '2021/10/23 14:20:00'
      }
    ]
  },
  receiverOrder(e) {
    // TODO: 接单时间 接单人 receiver

  },
  onChangeTabActive(e) {
    this.setData({ active: e.detail });
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
    getPendingOrder().then((res) => {
      this.setData({ 'pendOrderList': res.data })
    })
    getReceiveingOrder().then((res) => {
      this.setData({ 'receiveOrderList': res.data })
    })
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