// components/Tab/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handChange(e){
      console.log(e)
      const {id} = e.currentTarget.dataset
      console.log(id)
      this.triggerEvent('handchange',{id})
    }
  }
})
