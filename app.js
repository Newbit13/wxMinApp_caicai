// app.js
var fetchWechat = require('fetch-wechat');
var tf = require('@tensorflow/tfjs-core');
var webgl = require('@tensorflow/tfjs-backend-webgl');
var plugin = requirePlugin('tfjsPlugin');
// https://tfhub.dev/google/tfjs-model/movenet/singlepose/lightning/4 模型地址

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    plugin.configPlugin({ //注册tf
      fetchFunc: fetchWechat.fetchFunc(),
      tf,
      webgl,
      canvas: wx.createOffscreenCanvas(),
      backendName: 'wechat-webgl-' + Date.now()
    });

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    movenet: null,
  }
})