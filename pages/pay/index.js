// pages/cart/index.js
import {getSetting,chooseAddress,openSetting,showModel,showToast} from '../../utils/asyncWx.js'
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    address:{},
    // allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {

  // },
  onShow(){
    //every方法是不会对空数组检测的，可以用some()
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart')||[]
    // 过滤后的购物车数组，支付页面的商品checked都为true
    let checkedCart = cart.filter(item => item.checked)
    // const allChecked =cart.length ? cart.some(item => item.checked) :false
    this.setCart(checkedCart)
    this.setData({
      address:{
        userName:address.userName,
        addr:address.provinceName+address.cityName+address.countyName+address.detailInfo,
        telNumber:address.telNumber
      }
    })
  },


  setCart(cart){
    // let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item =>{
      if(item.checked){
        totalNum += item.num
        totalPrice += item.goods_price *item.num
      }else{
        allChecked = false
      }
    })
    // allChecked = cart.length !==0 ?allChecked : false
    this.setData({
      // allChecked,
      totalNum,
      totalPrice,
      cart,
    })  
    // wx.setStorageSync('cart', cart);   
    
  },
  
  handlePay(){
    wx.previewImage({
      urls: ['http://www.wsw2000.top/images/shang.png'],
      current: 'http://www.wsw2000.top/images/shang.png' // 当前显示图片的http链接      
    })
      
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})