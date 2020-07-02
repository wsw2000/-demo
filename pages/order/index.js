import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'
var localtext = require('../../data/order.js')
Page({
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive:true
    }, {
      id: 1,
      value: "待付款",
      isActive:false
    }, {
      id: 2,
      value: "代发货",
      isActive:false
    }, {
      id: 3,
      value: "退款/退货",
      isActive:false
    }],
    orderList:[],
    dr:true
  },
  // 根据标题的索引来激活选中 标题索引
  handleTabsItemChange(id){
    let {tabs} = this.data
    tabs.forEach((item,i)=> i===id ? item.isActive =true : item.isActive =false)
    this.setData({
      tabs
    })
  },
  handchanges(e){
    // console.log(e)
    const {id} = e.detail
    // console.log(id)
    this.handleTabsItemChange(id)
  },
  async getOrderList(type){
    const res = await request({url:"/my/orders/all",data:{type}})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(11);
    
    this.setData({
      orderList:localtext.postlist.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 因为该页面频繁被调用，所以用onShow,但是onShow获取不到options
    // 1.获取当前小程序的页面栈-数组 长度最大是10
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length - 1]
    console.log(currentPage.options);
    const {type} = currentPage.options
    //当type = 1 index =0
    this.handleTabsItemChange(type-1)
    
    
      
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})