// pages/goods_list/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive:true
      }, {
        id: 1,
        value: "销量",
        isActive:false
      }, {
        id: 2,
        value: "价格",
        isActive:false
      }],
      goodsList:[],
      // flag:true
  },

  
  params:{
    query:'',
    cid:0,
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log( options)
    this.params.cid = options.cid||"";
    this.params.query=options.query||"";
    this.getGoodList() 
  },
  async getGoodList(){
    console.log(this.params)
    const res = await request({url:'/goods/search',data:this.params})
    // 获取总页数
    const total = res.total
    this.totalPages = Math.ceil(total / this.params.pagesize)
    // if(res.goods.length <= 0){
    //   this.data.flag = false
    // }
    console.log(this.totalPages)
    // Math.ceil() 函数返回大于或等于一个给定数字的最小整数。
    console.log(res)
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
      
  },
  handchanges(e){
    // console.log(e)
    const {id} = e.detail
    console.log(id)
    let {tabs} = this.data
    tabs.forEach((item,i)=> i===id ? item.isActive =true : item.isActive =false)
    this.setData({
      tabs
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log(111)
    //重置数组
    this.setData({
      goodsList:[]
    })
    // 重置页码
    this.params.pagenum = 1
    this.getGoodList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if( this.params.pagenum >= this.totalPages ){
      wx.showToast({
        title: '没有更多商品了...',
        icon: 'none',
      })
    }else{
      this.params.pagenum++
      this.getGoodList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})