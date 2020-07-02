// pages/category/index.js
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftContent: [],
    rightContent: [],
    // 点击左侧菜单
    currentIndex: 0,
    // cates:[],
    scrolltop:0
  },
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 先判断本地存储有没有旧数据
    // 如果没有，直接放送请求
    // 有旧数据，同时旧数据没有过期，则不需发送
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      //不存在  发送请求数据
      this.getCate()
    } else {
      // 有旧数据 不会过期
      if(Date.now() - Cates.time > 1000*10){
        //过期了
        this.getCate()
      }else{
        // 不过期则使用旧数据
        this.cates = Cates.data;
        const leftContent = this.cates.map(item => item.cat_name)
        const rightContent = this.cates[0].children

        this.setData({
          leftContent,
          rightContent
        })
      }

    }

  },

  // 分类数据
  async getCate() {
    const res = await request({url: '/categories'})
    this.cates = res
      //把接口的数据存入到本地存储
      wx.setStorageSync('cates', { time: Date.now(), data: this.cates })
      console.log(res)
      const leftContent = this.cates.map(item => item.cat_name)
      const rightContent = this.cates[0].children

      this.setData({
        leftContent,
        rightContent
      })

    // request({
    //   url: '/categories'
    // }).then(res => {
    //   this.cates = res.data.message
    //   //把接口的数据存入到本地存储
    //   wx.setStorageSync('cates', { time: Date.now(), data: this.cates })
    //   console.log(res.data.message)
    //   const leftContent = this.cates.map(item => item.cat_name)
    //   const rightContent = this.cates[0].children

    //   this.setData({
    //     leftContent,
    //     rightContent
    //   })

    // })

  },
  handleItemTap(e) {
    console.log(e)
    const rightContent = this.cates[e.currentTarget.dataset.index].children
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      rightContent,
      // 重新设置scroll-view的scroll-top为0
      scrolltop:0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})