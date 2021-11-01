import { createUserInfo, getUserInfo, getArticleList, uploadFile } from '../../BBL.js';
const util = require('../../utils/util.js');
const config = require('../../config.js');

Page({
  data: {
    active: 'article',
    userInfo: {
      openid: '',
      nickName: '',
      avatarUrl: '',
      gender: '',
      phone: '',
      addr: '',
      money: '',
      bail: '',
      integral: '',
      couponCount: '',
      vip: false,
      worker: 0, // 0 超级身份 1 普通用户 2 填写商品 3 派送员
    },
    // isLogin: false,
    isLogin: true,
    update: false,
    verify: '',
    sendVerifyInfo: {
      addr: '',
      phone: '',
      buttonType: 'primary',
      buttonText: '发送验证码'
    },
    articleList: [{
      type: '饮料',
      name: '可乐',
      price: '2.50',
      picture: 'https://img0.baidu.com/it/u=1090803740,1296452137&fm=26&fmt=auto',
      num: 0, // 用户选择数量  不会存入数据库
      des: '250ml可乐'
    }],
    shoppingBtn: {
      total: 0,  // 从分开始
      loading: false,
      disabled: true,
    },
    shoppingCar: []
  },

  payOrder(e) {
    // TODO: 支付订单 
    // 将订单信息 
    var orderList = this.data.shoppingCar.filter((x) => {
      if (!(typeof x == 'undefined')) {
        delete x['_openid']; // 删除用户_openid
        return x
      }
    });
    var order = {
      // _id 订单号自动生成
      // _openid 下单用户唯一标识符 自动生成
      // 下单时间自动生成
      statu: 0, // 订单状态 0 未接单  1 已接单  2 已送达
      total: this.data.shoppingBtn.total, // 总金额
      num: 0, // 总商品数量
      addr: this.data.userInfo.addr,  // 地址
      phone: this.data.userInfo.phone, // 手机号
      previewImage: orderList[0].picture, // 预览图片 
      billDate: +new Date() // 时间戳 
    }
    for (let i = 0; i <= orderList.length - 1; i++) { order.num += orderList[i].num }
    // 各个商品数量 各个商品价格 各个商品描述 各个商品类型 写入 json 里面 订单号为文件名 
    const fs = wx.getFileSystemManager();
    fs.writeFileSync(`${wx.env.USER_DATA_PATH}/data.json`, JSON.stringify(orderList), 'utf8');
    // uploadFile('bbuStore/data.json', `${wx.env.USER_DATA_PATH}/data.json`).then((res)=>{console.log(res)});
    // https://686a-hjhcos-7g95a26f9b53c40d-1303950505.tcb.qcloud.la/bbuStore/data.json
    // cloud://hjhcos-7g95a26f9b53c40d.686a-hjhcos-7g95a26f9b53c40d-1303950505/bbuStore/data.json
    // wx.request({
    //   url: 'cloud://hjhcos-7g95a26f9b53c40d.686a-hjhcos-7g95a26f9b53c40d-1303950505/bbuStore/data.json',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   },
    //   fail: (res)=>{
    //     console.log(res)
    //   }
    // })
    console.log(order);
    // 发起支付行为
    wx.showToast({
      title: '暂时不能支付',
    })
  },

  orderNum(e) {
    // if (!this.data.isLogin) {
    //   wx.showToast({
    //     title: '请先授权哟',
    //     icon: 'error',
    //     mask: true
    //   })
    //   return;
    // }
    let data = e.currentTarget.dataset;
    let article = this.data.articleList[data.index];
    article.num = parseInt(article.num);
    let price = parseFloat(article.price) * 100;
    let total = this.data.shoppingBtn.total;
    if (data.name == 'add') {
      if (article.num.toString() == "NaN") { return }
      article.num += 1;
      total += price;
    }
    else if (data.name == 'del') {
      if (article.num <= 0 || (article.num.toString() == "NaN")) { return }
      article.num -= 1;
      total -= price;
    }
    this.setData({
      ['shoppingCar[' + data.index + ']']: article.num ? article : 'undefined'
    })
    this.setData({
      'shoppingBtn.total': total,
      ['articleList[' + data.index + ']']: article
    })
    total ? this.setData({ 'shoppingBtn.disabled': false }) : this.setData({ 'shoppingBtn.disabled': true });
  },

  goPages(e) {
    // if (!this.data.isLogin) {
    //   wx.showToast({
    //     title: '请先授权哟',
    //     icon: 'error',
    //     mask: true
    //   })
    //   return;
    // }
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
      success: function (res) { console.debug(res) }
    })
  },

  register(e) {
    let data = this.data.sendVerifyInfo;
    if (util.isPhoneNumber(data.phone) && data.addr) {
      this.setData({
        'userInfo.phone': data.phone,
        'userInfo.addr': data.addr,
        'userInfo.worker': 1
      })
      createUserInfo(this.data.userInfo)
        .then((res) => {
          console.info('创建用户', res);
          wx.setStorageSync('bbuStore.userInfo', this.data.userInfo);
          this.setData({
            update: false,
            isLogin: true
          })
        })
        .catch((res) => { console.error('创建失败', res) })
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.showModal({
        content: '请输入正确的手机号',
        cancelText: '再逛逛看',
        confirmText: '重新输入',
        success: (res) => {
          if (res.cancel) {
            this.setData({
              'update': false
            })
            wx.showToast({
              title: '注册失败',
              icon: 'error',
              duration: 2000
            })
          }
        }
      })
    }
  },

  onChange(e) {
    if (e.currentTarget.dataset.name == 'addr') {
      this.setData({
        'sendVerifyInfo.addr': e.detail
      })
    }
    else if (e.currentTarget.dataset.name == 'phone') {
      this.setData({
        'sendVerifyInfo.phone': e.detail
      })
    }
  },

  getLogin(e) {
    wx.getUserProfile({
      desc: '头像 昵称',
      success: (res) => {
        console.info('授权登录', res);
        res.userInfo.avatarUrl = res.userInfo.avatarUrl.replace('https://thirdwx.qlogo.cn', 'http://wx.qlogo.cn');
        let userInfo = res.userInfo;
        this.setData({ 'userInfo': userInfo });
        getUserInfo()
          .then((res) => {
            if (res.data.length > 0) {
              console.info('更新校内商城用户信息 ', res.data[0]);
              this.setData({ 'userInfo': res.data[0], 'isLogin': true });
              wx.setStorageSync('bbuStore.userInfo', res.data[0]);
              wx.showToast({
                title: '已经注册过',
                duration: 2000,
                icon: 'success'
              })
            } else { this.setData({ update: true }) }
          })
      },
      fail: (res) => { console.info('授权失败', res) }
    })
  },

  onChangeTabbarActive(e) {
    if (e.type == 'change') {
      this.setData({ active: e.detail });
    }
    else if (e.type == 'tap') {
      this.setData({ active: e.currentTarget.dataset.url })
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
    if (!wx.getStorageSync('_openid')) { console.info('没有 openid') }
    else {
      getUserInfo()
        .then((res) => {
          if (res.data.length > 0) {
            console.info('获取校内商城用户信息 ', res.data[0]);
            this.setData({ 'userInfo': res.data[0], 'isLogin': true });
            wx.setStorageSync('bbuStore.userInfo', res.data[0]);
          }
        })
        .catch((res) => { console.error(res) })
    }
    if (wx.getStorageSync('bbuStore.userInfo')) {
      this.setData({
        'userInfo': wx.getStorageSync('bbuStore.userInfo'),
        'isLogin': true
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getArticleList().then((res) => {
      this.setData({
        'articleList': res.data
      })
    }).catch((res) => {
      console.log(res);
    })
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
    // 下拉刷新数据
    getUserInfo().then((res) => {
      if (res.data.length > 0) {
        console.info('获取校内商城用户信息 ', res.data[0]);
        this.setData({ 'userInfo': res.data[0] });
        wx.setStorageSync('bbuStore.userInfo', res.data[0]);
        this.onLoad(0);
      }
    });
    // TODO: 判断用户是否注册
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