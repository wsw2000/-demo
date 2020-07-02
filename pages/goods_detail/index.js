import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    //商品是否收藏
    isCollect:false
  },
  // 商品对象
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPages = pages[pages.length - 1]
    let options = currentPages.options
    const {goods_id} = options
    console.log(goods_id)
    this.getGoodsDetail(goods_id)


    let cart = wx.getStorageSync("cart")||[];
    let totalNum1 = 0
    cart.forEach(item =>  totalNum1 += item.num )
    this.setData({
      totalNum1
    })
 
  },
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:'/goods/detail',data:{goods_id}})
    console.log(goodsObj)
    this.goodsInfo = goodsObj
     // 获取缓存种的商品收藏的数组
     let collect = wx.getStorageSync('collect')||[];
     // 判断当前商品是否被收藏
     let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id)
    this.setData({
     goodsObj:{
      goods_name:goodsObj.goods_name,
      goods_price:goodsObj.goods_price,
      //iphone部分手机不识别webp图片格式
      //临时改  确保后台存在1.webp => 1.jpg
      goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
      pics:goodsObj.pics
     },
     isCollect
    })
  },
  // 放大图片
  handlePreviewImage(e){
   
    const {url} = e.currentTarget.dataset
    const urls = this.goodsInfo.pics.map(item =>item.pics_mid)
    console.log(urls)
    console.log(url)
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls:urls// 需要预览的图片http链接列表
    })
  },
  // 购物车本地缓存
  handleCartAdd(){
    // 1.获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart")||[];
    // 2.判断 商品对象是否存在于购物车数组
    const index = cart.findIndex(item => item.goods_id === this.goodsInfo.goods_id)
    if(index === -1){
      // 3. 不存在 第一次添加
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    }else{
      // 已经存在购物车 
      cart[index].num ++
    }
    // 5.把购物车重新添加到缓存中
    wx.setStorageSync('cart',cart)
    let totalNum1 = 0
    cart.forEach(item =>  totalNum1 += item.num )
    this.setData({
      totalNum1
    })
    // 6.弹窗提示
    wx.showToast({
      title: '已加入购物车',
      icon: 'susscc',
      mask: true, //延迟触发，体验好
    });
        

  },
  handleCollect(){
    // 获取缓存中的商品收藏数组
    let isCollect = false
    let collect = wx.getStorageSync('collect')||[];
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id)

    if(index !== -1){
      // 能找到，表示已经收藏了
      collect.splice(index,1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
        
    }else{
      // 没有收藏.添加
      collect.push(this.goodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    // 把数组存到缓存中
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})