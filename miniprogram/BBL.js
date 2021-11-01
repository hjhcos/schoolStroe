// const db = wx.cloud.database();
// const tb_user = db.collection('user');
// const tb_articleList = db.collection('articleList');
// const tb_order = db.collection('order');


// /* *******************************************************************
// * 文件上传 获取 删除  start
// * ********************************************************************/
// /**
//  * 上传文件
//  * @param {string} cloudPath 保存路径
//  * @param {string} filePath 文件链接
//  */
// export function uploadFile(cloudPath, filePath) {
//   return wx.cloud.uploadFile({
//     cloudPath: cloudPath,
//     filePath: filePath
//   })
// }
// /**
//  * 通过文件ID删除文件
//  * @param {array} fileList
//  */
// export function deleteFile(fileList) {
//   return wx.cloud.deleteFile({ fileList: fileList })
// }
// /**
//  * 通过文件ID获取临时文件
//  * @param {array} fileList
//  */
// export function getTempFileURL(fileList) {
//   return wx.cloud.getTempFileURL({ fileList: fileList })
// }
// /* *******************************************************************
// * 上传 end
// * ********************************************************************/

// /* *******************************************************************
// * 用户创建 修改 查询  start tb_user
// * ********************************************************************/
// /**
//  * 通过 openid 获取用户信息
//  */
// export function getUserInfo() {
//   return tb_user.where({ openid: wx.getStorageSync('_openid') }).get({});
// }
// /**
//  * 创建用户信息
//  * @param {object} userInfo
//  */
// export function createUserInfo(userInfo) {
//   return tb_user.add({ data: userInfo })
// }
// /* *******************************************************************
// * 用户创建 修改 查询  end tb_user
// * ********************************************************************/



// /* *******************************************************************
// * 商品创建 修改 查询  start tb_articleList
// * ********************************************************************/
// /**
//  * 获取所有商品
//  */
// export async function getArticleList() {
//   const MAX_LIMIT = 20;
//   const countResult = await tb_articleList.count();
//   const total = countResult.total;
//   const batchTimes = Math.ceil(total / 100);
//   const tasks = [];
//   for (let i = 0; i < batchTimes; i++) { 
//     const promise = tb_articleList.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
//     tasks.push(promise);
//   } 
//   return (await Promise.all(tasks)).reduce((acc, cur) => {
//     return {
//       data: acc.data.concat(cur.data),
//       errMsg: acc.errMsg,
//     }
//   })
// }
// /**
//  * 每批次20个 获取商品第几批次数据
//  * @param {number} batch 
//  */
// export async function getArticleBatch(batch) {
//   const MAX_LIMIT = 20;
//   const countResult = await tb_articleList.count();
//   const total = countResult.total;
//   const batchTimes = Math.ceil(total / 100);
//   const tasks = [];
//   if (batch < batchTimes) {
//     const promise = tb_articleList.skip(batch * MAX_LIMIT).limit(MAX_LIMIT).get();
//     tasks.push(promise);
//     return (await Promise.all(tasks)).reduce((acc, cur) => {
//       return {
//         data: acc.data.concat(cur.data),
//         errMsg: acc.errMsg,
//       }
//     })
//   }

// }
// /**
//  * 添加商品信息
//  * @param {object} articleInfo
//  */
// export function addArticleInfo(articleInfo) {
//   return tb_articleList.add({ data: articleInfo })
// }
// /* *******************************************************************
// * 商品创建 修改 查询  end tb_articleList
// * ********************************************************************/



// /* *******************************************************************
// * 订单创建 获取 删除  start tb_order
// * ********************************************************************/
// /**
//  * 通过用户获取订单列表
//  */
// export function getOrderList(){
//   return tb_order.where({_openid: wx.getStorageSync('_openid')}).get()
// }
// /**
//  * 通过订单号获取订单
//  * @param {string} oraderID 
//  */
// export function getOrder(oraderID){
//   return tb_order.where({_id: oraderID}).get()
// }
// /**
//  * 获取所有待接单的列表
//  * 0 未接单 1 已接单 2 已收货
//  */
// export function getPendingOrder(){
//   return tb_order.where({statu: 0}).get()
// }
// /**
//  * 获取所有已接单的列表
//  * 0 未接单 1 已接单 2 已收货
//  */
// export function getReceiveingOrder(){
//   return tb_order.where({statu: 1, _openid: wx.getStorageSync('_openid')}).get()
// }
// /**
//  * 获取当前用户待发货的列表
//  * 0 未接单 1 已接单 2 已收货
//  */
// export function getPendingOrderByCurrentUser(){
//   return tb_order.where({statu: 0, _openid: wx.getStorageSync('_openid')}).get()
// }
// /**
//  * 获取当前用户已收货的列表
//  * 0 未接单 1 已接单 2 已收货
//  */
// export function getReceivedOrderByCurrentUser(){
//   return tb_order.where({statu: 1, _openid: wx.getStorageSync('_openid')}).get()
// }
// /**
//  * 通过订单号删除订单
//  * @param {string} oraderID
//  */
// export function delOrder(orderID){
//   return tb_order.remove({_id: orderID}).get()
// }
// /**
//  * 创建订单
//  * @param {object} orader 
//  */
// export function createOrader(oraderInfo){
//   // 图片 地址 手机号 json文件链接 订单状态 
//   return tb_order.add({data: oraderInfo})
// }
// /**
//  * 修改订单
//  * @param {object} orader 
//  */
//  export function changeOrader(oraderInfo){
//   // TODO: 订单
//   return tb_order.change({data: oraderInfo})
// }
// /* *******************************************************************
// * 创建订单 获取 删除  end tb_order
// * ********************************************************************/ 