// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  // {  event
  //   "FromUserName": "ohl4L0Rnhq7vmmbT_DaNQa4ePaz0",
  //     "ToUserName": "wx3d289323f5900f8e",
  //       "Content": "测试",
  //         "CreateTime": 1555684067,
  //           "MsgId": "49d72d67b16d115e7935ac386f2f0fa41535298877_1555684067",
  //             "MsgType": "text"
  // }
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: '小程序完善中...',
    },
  })

  return 'success'
}