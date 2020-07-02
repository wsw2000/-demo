// 同时发送异步代码的次数
let ajaxTime = 0
export const request = (params) =>{
    ajaxTime ++;
    //定义的公共url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    wx.showLoading({
        title: "加载中...",
        mask:true
    });
      
    return new Promise((resolve,reject) =>{
        wx.request({
            ...params,
            url:baseUrl + params.url,
            success:(res) =>{
                resolve(res.data.message);
            },
            fail:(err)=>{
                reject(err)
            },
            complete(){
                ajaxTime --;
                if(ajaxTime === 0){
				    wx.hideLoading();      
                }
			}
        })
    })
}