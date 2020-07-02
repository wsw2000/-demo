import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index.js'
import {login} from '../../utils/asyncWx.js'
Page({
  async handleGetuserinfo(e){
    const {encryptedData,rawData,iv,signature} = e.detail
    const {code} = await login()
    console.log(encryptedData,rawData,iv,signature);
    const loginParams = {encryptedData,rawData,iv,signature,code}
    //发送请求获取用户的token值
    const res = await request({url:"/users/wxlogin",data:loginParams,method:"post"})
    console.log(res)
    
    
      
    console.log(e)
    const {userInfo} = e.detail
    wx.setStorageSync('userInfo', userInfo);
    wx.navigateBack({
      delta: 1
    });
        
  }
})