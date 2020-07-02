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
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {

  // },
  onShow(){
    const userinfo = wx.getStorageSync('userInfo');

    //every方法是不会对空数组检测的，可以用some()
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart')||[]
    // const allChecked =cart.length ? cart.some(item => item.checked) :false
    this.setCart(cart)
    this.setData({
      userinfo,
      address:{
        userName:address.userName,
        addr:address.provinceName+address.cityName+address.countyName+address.detailInfo,
        telNumber:address.telNumber
      }
    })
  },
  handleChangeItem(e){
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    const index = cart.findIndex(item => item.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  changeAll(){
    this.data.allChecked = !this.data.allChecked
    let {cart} = this.data
    cart.forEach(item => item.checked = this.data.allChecked) 
    this.setCart(cart)
  },
  // 按加减修改数值变化
  async handleEdit(e){
    const {id,option} = e.currentTarget.dataset
    console.log(id,option);
    let {cart} = this.data
    const index = cart.findIndex(item => {
      return item.goods_id === id
    })
    // console.log(index)
    // 判断是否要执行删除
    if(cart[index].num ==1 && option == -1){
      const res = await showModel ({content:"你是否要删除该商品"})
      if(res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }else if (res.cancel){
        await showToast({title:'您已经取消了删除'})
      }
    }else{
      cart[index].num += option
      this.setCart(cart)
    }  
  },
  setCart(cart){
    let allChecked = true
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
    allChecked = cart.length !==0 ?allChecked : false
    this.setData({
      allChecked,
      totalNum,
      totalPrice,
      cart,
    })  
    wx.setStorageSync('cart', cart);   
    
  },
    async chooseAddress(){
      try {
      // 1.获取 权限状态
      // wx.getSetting({
      //   success: (result) => {
      //     // 2.获取权限状态
      //     const scopeAddress = result.authSetting["scope.address"]
      //     if(scopeAddress === true || scopeAddress === undefined){
      //       wx.chooseAddress({
      //         success:(res) =>{
      //           console.log(res)
      //         }
      //       })
      //     }else{
      //       // 用户 以前拒绝过授予权限  先诱导用户打开授权页面
      //       wx.openSetting({
      //         success: (result) => {
      //           wx.chooseAddress({
      //             success: res2 =>{
      //               console.log(res2)
      //             }
      //           })
      //         },
      //         fail: () => {},
      //         complete: () => {}
      //       });
              
      //     }
      //   },
      //   fail: () => {},
      //   complete: () => {}
      // }); 
      const res1 = await getSetting();  
      const scopeAddress = res1.authSetting["scope.address"]
      if(scopeAddress === true || scopeAddress === undefined){   
      }else{
        await  openSetting()
      }    
      const res2 = await chooseAddress()
      console.log(res2)
      wx.setStorageSync('address', res2);
    }catch (error) {
    console.log(error)
  }
  },
  async handlePay(){
    const {address,totalNum} = this.data
    
    // console.log(userinfo)
   
    if(!address.userName){
      await showToast({title:'您还未选择收货地址'})
      return
    }
    if(totalNum === 0){
      await showToast({title:'您还未选择商品'})
      return
    }
    if(this.data.userinfo.length <= 0){
      await showToast({title:'您还没登录'})
      wx.navigateTo({
        url: '/pages/login/index',
      });
        
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
      
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})