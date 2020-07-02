// pages/index/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [],
    catesList:[],
    // 楼层数据
    floorList:[]
    
  },

  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // 轮播
  getSwiper(){
    request({ url: '/home/swiperdata' })
    .then(res => {
      res.forEach(item => { item.type = "image" })
      res.forEach(item => { item.navigator_url = item.navigator_url.replace(/main/g,'index') })
      // goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
      // console.log(res.data.message)
      this.setData({
        swiperList: res,
      })
    })
  },
  // 导航
  getCateList(){
    request({ url: '/home/catitems' })
    .then(res => {
      this.setData({
        catesList: res,
      })
    })
  },
  getFloorList(){
    request({ url: '/home/floordata' })
    .then(res => {
     
      res.forEach(item => {item.product_list[0].navigator_url  = item.product_list[0].navigator_url.replace('/pages/goods_list','/pages/goods_list/index')})
      res.forEach(item => {item.product_list[1].navigator_url  = item.product_list[1].navigator_url.replace('/pages/goods_list','/pages/goods_list/index')})
      res.forEach(item => {item.product_list[2].navigator_url  = item.product_list[2].navigator_url.replace('/pages/goods_list','/pages/goods_list/index')})
      res.forEach(item => {item.product_list[3].navigator_url  = item.product_list[3].navigator_url.replace('/pages/goods_list','/pages/goods_list/index')})
      res.forEach(item => {item.product_list[4].navigator_url  = item.product_list[4].navigator_url.replace('/pages/goods_list','/pages/goods_list/index')})
      this.setData({
        floorList: res,
        // product_list:res1
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getSwiper()
   this.getCateList()
   this.getFloorList()
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})