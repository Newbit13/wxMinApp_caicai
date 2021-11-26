// index.js
// 获取应用实例
const app = getApp();
// tf.loadGraphModel("https://tfhub.dev/google/movenet/singlepose/lightning/tfjs/4", { fromTFHub: true });
var poseDetection = require("@tensorflow-models/pose-detection");
Page({
  data: {
    motto: "点我跳转",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"), // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  toMainPage() {
    wx.navigateTo({
      url: "../main/main",
    });
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
    this.loadMoveNet();
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  // 加载模型
  loadMoveNet() {
    if (app.globalData.movenet) return false;
    var that = this,
      modelUrl =
        "https://6361-caicai-9gjewvnsca53d884-1306606298.tcb.qcloud.la/tfmodel/model.json?sign=fbd961db477a69f5620613f6ac4c1839&t=1626942944",
      detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        modelUrl: modelUrl,
      };
    poseDetection
      .createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig)
      .then(function (detector) {
        app.globalData.movenet = detector;
        wx.navigateTo({
          url: "../main/main",
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  },
});
