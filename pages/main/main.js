// pages/main.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fps: 50,
    w:0,
    h:0,
    // resultFps: 0,
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.flagTimer && clearInterval(this.flagTimer);
  },
  // 点操作
  cameraFrame() {
    // 视频流
    var that = this,
      store = [],
      // startTime = new Date(),
      camera = wx.createCameraContext();

    that.listener = camera.onCameraFrame(function (frame) {
      if (!that.pxMap) {
        that.setData({
          w:frame.width,
          h:frame.height,
        })
        console.log(frame.width);
        console.log(frame.height);
        //用来做视频流大小与canvas的映射
        that.pxMap = true;
        // console.log(frame.width);
        console.log(that.canvas);
        that.canvas.width = frame.width; //480
        // that.canvas.width = 100;
        that.canvas.height = frame.height;
        // that.canvas.height = frame.height - 200;
      }

      if (frame && app.globalData.movenet) {
        //帧率控制
        store.push(frame);
      }
    });
    that.listener.start({
      success: function () {
        that.flagTimer && clearInterval(that.flagTimer);
        that.flagTimer = setInterval(function () {
          //帧率控制
          if (store.length == 0) return;
          var object = {
            data: new Uint8Array(store[store.length - 1].data),
            height: Number(store[store.length - 1].height),
            width: Number(store[store.length - 1].width),
          };
          that.actionSend(object);
          store = [];
          // that.setData({
          //   resultFps: that.data.resultFps + 1,
          //   fpstime: parseInt((that.data.resultFps + 1) * 1000 / (new Date().getTime() - startTime))
          // })
        }, 1000 / that.data.fps);
      },
    });
  },

  actionSend(object) {
    // 识别点
    const that = this;
    // console.log("object开始");
    app.globalData.movenet
      .estimatePoses(object)
      .then(function (res) {
        // console.log(res);
        var ctx = that.ctx,
          keypoimts = res[0].keypoints;
        // if (!that.first) {
        //   that.first = true;
        //   console.log(keypoimts);
        // }
        ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
        that.drawSkevaron(keypoimts);
        that.drawKeypoints(keypoimts);
        that.drawKeypoints([{ x: 0, y: 0 }]);
        that.drawKeypoints([{ x: 0, y: 10 }]);
        that.drawKeypoints([{ x: 480, y: 10 }]); //该点出现在屏幕的最右边，而此时canvas宽度480，窗口宽度320
        that.drawKeypoints([{ x: 100, y: 10 }]);
        that.drawKeypoints([{ x: 480, y: 640 }]);

        that.drawBox(); //画一个框框，用来辅助检测人是否在框内
        that.drawBoxPeople(keypoimts); //画一个框框，用来圈出人的柱形
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  drawBox() {
    const that = this;
    const w = that.canvas.width;
    const h = that.canvas.height;

    const point1 = { x: 20, y: 20 };
    const point2 = { x: w - 20, y: 20 };
    const point3 = { x: w - 20, y: h - 20 };
    const point4 = { x: 20, y: h - 20 };

    this.drawSegment(point1, point2);
    this.drawSegment(point2, point3);
    this.drawSegment(point3, point4);
    this.drawSegment(point4, point1);
  },
  drawBoxPeople(keypoints) {
    let len = keypoints.length;
    const w = this.canvas.width;
    const h = this.canvas.height;
    let o = {
      minX: w,
      maxX: 0,
      minY: h,
      maxY: 0,
    };
    for (let index = 0; index < len; index++) {
      const point = keypoints[index];
      if (point.x < o.minX) {
        o.minX = point.x;
      }
      if (point.x > o.maxX) {
        o.maxX = point.x;
      }
      if (point.y < o.minY) {
        o.minY = point.y;
      }
      if (point.y > o.maxY) {
        o.maxY = point.y;
      }
    }

    const point1 = { x: o.minX, y: o.minY };
    const point2 = { x: o.maxX, y: o.minY };
    const point3 = { x: o.maxX, y: o.maxY };
    const point4 = { x: o.minX, y: o.maxY };

    this.drawSegment(point1, point2, "#ccc");
    this.drawSegment(point2, point3, "#ccc");
    this.drawSegment(point3, point4, "#ccc");
    this.drawSegment(point4, point1, "#ccc");
  },
  drawSkevaron(keypoints, scale = 1) {
    // 关键点连线
    // 头部
    this.drawSegment(keypoints[0], keypoints[1]);
    this.drawSegment(keypoints[0], keypoints[2]);
    this.drawSegment(keypoints[1], keypoints[3]);
    this.drawSegment(keypoints[2], keypoints[4]);
    // 下身
    this.drawSegment(keypoints[10], keypoints[8]);
    this.drawSegment(keypoints[8], keypoints[6]);
    this.drawSegment(keypoints[6], keypoints[5]);
    this.drawSegment(keypoints[5], keypoints[7]);
    this.drawSegment(keypoints[7], keypoints[9]);

    this.drawSegment(keypoints[6], keypoints[12]);
    this.drawSegment(keypoints[12], keypoints[11]);
    this.drawSegment(keypoints[11], keypoints[5]);
    this.drawSegment(keypoints[12], keypoints[14]);
    this.drawSegment(keypoints[14], keypoints[16]);
    this.drawSegment(keypoints[11], keypoints[13]);
    this.drawSegment(keypoints[13], keypoints[15]);
  },

  drawSegment(akeypoints, bkeypoints, color) {
    // 画线
    // var ax = akeypoints[0],
    //   ay = akeypoints[1],
    //   bx = bkeypoints[0],
    //   by = bkeypoints[1]
    var ax = akeypoints.x,
      ay = akeypoints.y,
      bx = bkeypoints.x,
      by = bkeypoints.y;
    this.ctx.beginPath();
    this.ctx.moveTo(ax, ay);
    this.ctx.lineTo(bx, by);
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = color || "#52ecf7";
    this.ctx.stroke();
    this.ctx.restore();
  },

  drawKeypoints(keypoints) {
    // 画关键点
    // console.log(keypoints);
    for (var i = 0; i < keypoints.length; i++) {
      var keypoint = keypoints[i];
      // this.drawPoint(keypoint[1], keypoint[0]);
      this.drawPoint(keypoint.y, keypoint.x);
    }
  },

  drawPoint(y, x) {
    // canvas画点
    this.ctx.beginPath();
    this.ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#ff00ff";
    this.ctx.fillStyle = "#00ff66";
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  },

  canvasInit(cb) {
    // 获取canvas
    var that = this;
    wx.createSelectorQuery()
      .select("#myCanvas")
      .fields({
        node: true,
        size: true,
      })
      .exec(function (res) {
        var canvas = res[0].node;
        var ctx = canvas.getContext("2d");

        var dpr = wx.getSystemInfoSync().pixelRatio
        // console.log(dpr);
        // canvas.width = 375 * dpr
        // canvas.height = 640 * dpr
        // ctx.scale(2, 2)//没用

        // 不管dom大小多少，默认canvas就是300，150
        // console.log(canvas.width);
        // console.log(canvas.height);
        // canvas大小在获取视频流之后设置
        // wx.getSystemInfo({
        //   success: function (res) {
        //     //iphone5 320 screenHeight：568 windowHeight：504 pixelRatio:2 statusBarHeight:20 还有个safeArea
        //     canvas.width = res.windowWidth;
        //     canvas.height = res.windowHeight; //这是手机屏幕高度，不是看见的相机高度
        //   },
        // });

        that.ctx = ctx;
        that.canvas = canvas;
        that.res0 = res[0];

        // that.drawPoint(320, 320)
        // that.drawKeypoints([
        //   {x:264,y:245},
        //   {x:262,y:304}
        // ])
        // that.drawSegment([0,0],[100,200])

        cb(); //注册视频流
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    this.canvasInit(function () {
      that.cameraFrame();
    });
    // this.cameraFrame()
  },
});
