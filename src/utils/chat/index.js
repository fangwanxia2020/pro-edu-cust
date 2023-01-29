/* import SockJS from  './sockjs';
import {Stomp} from './stomp'; */
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

/** Chat 类* */
export default class Chat {
  constructor() {
    this.subEvents = {} // 订阅的事件
    this.isConnect = false // 连接状态
    this.stompClient = null // STOMP子协议的客户端对象
    this.selfClose = false // 是否自己关闭连接
    this.ws = null // socket连接对象
    this.url = null // 连接地址
    this.user = {} // 连接用户信息(用户的登录和密码凭证)
  }

  /**
	连接方法
	@param {String} url - 连接SockJS的url
	@param {Object} user - 连接用户对象
	*/
  connect(url, user) {
    this.isConnect = false
    this.url = url
    this.user = user || {}
    this.ws = new SockJS(url)
    this.stompClient = Stomp.over(this.ws)
    // stomp配置
    this.config()
    this.stompClient.connect(
      this.user,
      (data) => {
        // 连接成功
        this.isConnect = true
        this.connectOk.apply(this, [data])
      },
      (error) => {
        // 连接失败
        this.isConnect = false
        this.connectError.apply(this, [error])
      }
    )

    /* 锁屏情况下，js 会停止工作，这时，ws 会自动关闭，当屏幕唤醒时，通过触发 onclose 事件，ws又会进行重连。 */
    this.ws.onclose = (e) => {
      this.isConnect = false
      if (!this.selfClose) {
        // 不是自己关闭的情况下开启从连
        // this.reConnect();
      }
    }
  }

  /**
	重连方法
	*/
  reConnect() {
    if (this.isConnect) {
      return
    }
    this.connect(this.url, this.user)
  }

  /**
	连接成功后的回调
	@param {Object} data- CONNECT frame对象
	*/
  connectOk(data) {
    const stompClient = this.stompClient
    if (this.isConnect) {
      // 发布连接成功事件
      this.trigger.apply(this, ['connectOk', stompClient.subscribe.bind(stompClient), data])
      // 发布发送消息到服务端事件
      this.trigger.apply(this, ['sendMsg', stompClient.send.bind(stompClient), data])
    }
  }

  /**
	连接失败后的回调
	@param {Object} error- 错误对象
	*/
  connectError(error) {
    const stompClient = this.stompClient
    this.trigger.apply(this, ['connectError', stompClient, error])
  }

  /**
	发布方法---有绑定过的方法会在这里触发
	@param {String} eventType  -发布事件
	*/
  trigger(eventType, ...data) {
    eventType = this.subEvents[eventType] || []
    for (var i = 0; i < eventType.length; i++) {
      eventType[i].apply(this, data)
    }
  }

  /**
	绑定事件
	@param {String} eventType  -绑定事件名
	@param {function} eventType  -绑定方法
	*/
  on(eventType, handle) {
    if (!(eventType in this.subEvents)) {
      this.subEvents[eventType] = []
    }
    this.subEvents[eventType].push(handle)
  }

  /**
	解绑事件
	@param {String} eventType  -解绑事件名
	*/
  off(eventType) {
    eventType = this.subEvents[eventType]
    if (eventType) {
      this.subEvents[eventType] = []
    }
  }

  // 断开连接
  disconnect() {
    if (this.stompClient != null && this.isConnect) {
      this.stompClient.disconnect()
      this.isConnect = false
      this.selfClose = true
      this.ws = null
      this.stompClient = null
    }
  }

  /**
	发消息---前提要已经处于连接状态
	@param {String} url - 发送地址
	@param {String} msg - 发送的消息
	@param {Object} user - 连接用户对象，默认值选择连接上的user
	*/
  send(url, msg, user, callBack) {
    user = user || this.user
    if (this.isConnect) {
      this.stompClient.send(url, user, msg)
      callBack && callBack(msg)
    }
  }

  /**
	stomp配置
	@param {Object} configObj - stomp配置对象
	*/
  config(configObj) {
    const { outgoing = 300, incoming = 0 } = configObj || {}
    // 每隔30秒做一次心跳检测
    this.stompClient.heartbeat.outgoing = outgoing
    // 客户端不接收服务器的心跳检测
    this.stompClient.heartbeat.incoming = incoming
  }
}
