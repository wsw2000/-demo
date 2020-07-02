import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:true,
    checkInpu:"",
    list:[
      {
        id:1,
        name:'华为'
      },
      {
        id:2,
        name:'小米'
      },
      {
        id:3,
        name:'苹果'
      },
      {
        id:4,
        name:'女朋友'
      },
      {
        id:5,
        name:'冰箱'
      },{
        id:6,
        name:'空调'
      },{
        id:7,
        name:'冰箱'
      },{
        id:8,
        name:'冰箱'
      },
    ]
  },
  btnchange(e){
    console.log(e)
    const {name} = e.currentTarget.dataset
    this.getGoods(name)
  },
  TimeId:-1,
  // 防抖一般是用在输入框中 的，防止重复输入 重复发送请求
  // 节流一般是用在页面上拉跟下拉
  handleChange(e){
    console.log(e)
    
    const {value} = e.detail
    // this.setData({
    //   value
    // })
    if(!value.trim()){
      //当输入框没有值的时候
      this.setData({
        goods:[],
        isFocus:true,
      })
      return
    }
    this.setData({
      isFocus:false
    })
    clearTimeout(this.TimeId)
    // console.log(this.data.checkInpu)
    this.TimeId = setTimeout(()=>{
      this.getGoods(value)
    },1000)
  },
  changFocus(){
    this.setData({
      isFocus:true,
      goods:[],
      checkInpu:''
    })
  },
  async getGoods(query){
    const res = await request({url:"/goods/qsearch",data:{query}})
    console.log(res);
    if(res.length <=0){
      wx.showToast({
        title: '抱歉没有该商品',
        icon: 'loading',
      });
        
    }
    this.setData({
      goods:res
    })
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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