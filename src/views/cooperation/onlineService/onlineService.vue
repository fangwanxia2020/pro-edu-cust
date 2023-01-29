<!--
    在线客服
    @author hjm
    @date 2020-04-13
    @since 1.0.0
-->
<template>
  <div class="service">
    <div class="service-content service-left" v-if="!pageType">
      <el-badge
        class="client-num"
        :value="clientList.length"
        :hidden="clientList.length > 0 ? false : true"
        :max="99"
      >
      </el-badge>
      <el-tabs type="border-card" class="service-card" v-model="serviceLeftTab">
        <el-tab-pane label="已接待会话" name="0">
          <div class="service-list">
            <div
              :class="[
                'service-list-item',
                relationSelected == relationIndex ? 'service-list-item-select' : ''
              ]"
              v-for="(relationItem, relationIndex) in relationList"
              :key="relationIndex"
              @click="relationChat(relationItem, relationIndex)"
            >
              <el-badge
                class="service-list-logo-con"
                :value="relationItem.msgLogNum"
                :hidden="relationItem.msgLogNum > 0 ? false : true"
                :max="99"
              >
                <img
                  class="service-list-logo"
                  :src="relationItem.headImage"
                  v-if="relationItem.headImage"
                />
                <img class="service-list-logo" src="../../../assets/images/user.png" v-else />
              </el-badge>
              <div class="service-list-main">
                <div class="service-list-name">
                  {{ relationItem.nickName }}
                </div>
                <div class="service-list-text">
                  {{ relationItem.msgType == 3 ? '商品信息' : relationItem.message }}
                </div>
              </div>
              <div class="service-list-time">
                {{
                  relationItem && relationItem.sendTime
                    ? relationItem.sendTime.substring(0, 10)
                    : ''
                }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="客户会话" name="1">
          <div
            class="service-list-item"
            v-for="(clientItem, clientIndex) in clientList"
            :key="clientIndex"
            @click="clientChat(clientItem)"
          >
            <img
              v-if="clientItem.headImageSrc"
              class="service-list-logo service-list-logo-con"
              :src="clientItem.headImageSrc"
            />
            <img
              v-else
              class="service-list-logo service-list-logo-con"
              src="../../../assets/images/user.png"
            />
            <div class="service-list-main">
              <div class="service-list-name">
                {{ clientItem.nickName }}
              </div>
              <div class="service-list-text">
                {{ clientItem.allMsgLogInfoVOS[clientItem.allMsgLogInfoVOS.length - 1].message }}
              </div>
            </div>
            <div class="service-list-time">
              {{
                clientItem && clientItem.allMsgLogInfoVOS[clientItem.allMsgLogInfoVOS.length - 1]
                  ? clientItem.allMsgLogInfoVOS[
                      clientItem.allMsgLogInfoVOS.length - 1
                    ].sendTime.substring(0, 10)
                  : ''
              }}
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="service-content service-main" v-if="showFlag">
      <div class="service-main-header">
        <div class="service-main-header-dot"></div>
        <div class="service-main-header-name">{{ custUser.name }}</div>
        <!-- (会话来自华灯研学) -->
      </div>
      <div class="service-main-detail" id="dialogue-box">
        <div class="service-more-btn" v-if="moreFlag">
          <el-button type="text" size="mini" @click="lookMore()"> 查看更多 </el-button>
        </div>
        <div v-for="(msgItem, msgIndex) in msgLogList" :key="msgIndex">
          <div v-if="msgItem.objSign == 0" class="service-main-item service-main-item-left">
            <div class="service-main-item-content">
              <img
                v-if="msgItem.senderHeadImage"
                class="service-main-logo"
                :src="msgItem.senderHeadImage"
              />
              <img v-else class="service-main-logo" src="../../../assets/images/user.png" />
              <el-image
                v-if="msgItem.msgType == 1"
                :preview-src-list="[msgItem.fileKey]"
                :src="msgItem.fileKey"
                class="service-msg-img"
              >
              </el-image>
              <div v-if="msgItem.msgType == 0" class="service-main-text">
                {{ msgItem.content }}
              </div>
              <!-- 商品信息 -->
              <div class="service-main-text" v-if="msgItem.msgType == 3">
                <el-image class="goods-img" :src="msgItem.fileKey" mode="aspectFill"></el-image>
                <div class="goods-info" v-if="msgItem.content">
                  <div class="goods-name">{{ JSON.parse(msgItem.content).name }}</div>

                  <div class="goods-price">
                    <span class="goods-price-icon">￥</span>{{ JSON.parse(msgItem.content).price
                    }}<span class="goods-tip">起</span>
                  </div>
                </div>
                <!-- <view class="goods-con">
                  222

                  <view class="goods-info" v-if="msgItem.content">
                    <view class="goods-name">{{ JSON.parse(msgItem.content).name }}</view>

                    <view class="goods-price">
                      <text class="goods-price-icon">￥</text>{{ JSON.parse(msgItem.content).price
                      }}<text class="goods-tip">起</text>
                    </view>
                  </view>
                </view> -->
              </div>
            </div>
            <div class="service-main-info">
              {{ msgItem.senderNick }}
              <div class="service-main-time">{{ msgItem.sendTime }}</div>
            </div>
          </div>
          <div v-else class="service-main-item service-main-item-right">
            <div class="service-main-item-content">
              <el-image
                v-if="msgItem.msgType == 1"
                :preview-src-list="[msgItem.fileKey]"
                :src="msgItem.fileKey"
                class="service-msg-img"
              >
              </el-image>
              <div v-if="msgItem.msgType == 0" class="service-main-text">
                {{ msgItem.content }}
              </div>
              <!-- 商品信息 -->
              <view class="service-goods-con" v-if="msgItem.msgType == 3">
                <view class="goods-con">
                  <image class="goods-img" :src="msgItem.fileKey" mode="aspectFill"></image>
                  <view class="goods-info" v-if="msgItem.content">
                    <view class="goods-name">{{ JSON.parse(msgItem.content).name }}</view>
                    <view class="goods-price">
                      <span class="goods-price-icon">￥</span>{{ JSON.parse(msgItem.content).price
                      }}<span class="goods-tip">起</span>
                    </view>
                  </view>
                </view>
              </view>
              <!-- 知识库 -->
              <div v-if="msgItem.msgType == 4" class="service-main-text">
                关于您咨询的问题，详情查看
              </div>
              <img
                v-if="msgItem.senderHeadImage"
                class="service-main-logo"
                :src="msgItem.senderHeadImage"
              />
              <img v-else class="service-main-logo" src="../../../assets/images/service.png" />
            </div>
            <div class="service-main-info">
              <div class="service-main-time">{{ msgItem.sendTime }}</div>
              {{ msgItem.senderNick != 'null' ? msgItem.senderNick : '客服' }}
            </div>
          </div>
        </div>
      </div>
      <div class="service-main-send">
        <el-upload
          class="service-main-icon"
          action=""
          :show-file-list="false"
          :before-upload="catalogImg"
        >
          <img class="service-main-img" src="../../../assets/images/onlineService.png" />
        </el-upload>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="sendText"
          @keyup.enter.native="sendMsgFun()"
        >
        </el-input>
        <div class="service-main-btn">
          <!-- <el-button plain size="mini" round>结束会话</el-button> -->
          <el-button type="primary" size="mini" round @click="sendMsgFun()"> 发送 </el-button>
        </div>
      </div>
    </div>
    <div class="service-content service-right" v-if="showFlag && !pageType">
      <el-tabs type="border-card" class="service-card">
        <!-- <el-tab-pane label="资料">
                    <el-form ref="form" label-width="60px" size="mini" class="service-form">
                        <el-form-item label="ID">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="昵称">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="微信号">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane> -->
        <el-tab-pane label="常用语">
          <div class="knowledge-input">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="commonWordsSearch"
              @keyup.enter.native="getKfPhraseList(0)"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-collapse accordion>
            <el-collapse-item
              v-for="(commonWordsItem, commonWordsIndex) in commonWordsList"
              :key="commonWordsIndex"
              :title="commonWordsItem.categoryName"
              :name="commonWordsItem.categoryId"
            >
              <div
                v-for="(wordsItem, wordsIndex) in commonWordsItem.kfPhraseDetailsVOS"
                :key="wordsIndex"
              >
                <div
                  v-for="(item, index) in wordsItem.kfPhraseInfoListVOS"
                  :key="index"
                  class="service-common-item"
                >
                  <div class="service-common-dot"></div>
                  <!-- <div class="service-common-text">
                                        {{item.replyContent}}
                                    </div> -->
                  <el-input
                    v-model="item.replyContent"
                    type="textarea"
                    autosize
                    style="margin-right: 6px"
                  >
                  </el-input>
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="sendMsgFun(item.replyContent)"
                  >
                    发送
                  </el-button>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="service-no-main" v-if="commonWordsList.length == 0">没有这个关键字哦！</div>
        </el-tab-pane>
        <!-- <el-tab-pane label="知识库">
                    <div class="knowledge-input">
                        <el-input size="mini"
                            placeholder="请输入内容"
                            v-model="knowledgeSearch"
                            @keyup.enter.native="getKfPhraseList(1)">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <el-collapse accordion>
                        <el-collapse-item v-for="(commonWordsItem,commonWordsIndex) in knowledgeList"
                            :key = "commonWordsIndex"
                            :title="commonWordsItem.categoryName"
                            :name="commonWordsItem.categoryId">
                            <div class="knowledge" v-for="(knowledgeItem,knowledgeIndex) in commonWordsItem.kfPhraseDetailsVOS"
                                :key="knowledgeIndex">
                                <div class="knowledge-title">
                                    <img class="knowledge-img"
                                        src="../../../assets/images/knowledge.png">
                                        {{knowledgeItem.titleName}}
                                    </img>
                                </div>
                                <div class="knowledge-con" v-for="(item,index) in knowledgeItem.kfPhraseInfoListVOS" :key="index">
                                    <div class="knowledge-text">
                                    </div>
                                    <el-button type="primary" size="mini" round
                                        @click="sendMsgFun(item.replyContent,'',item.kfPhraseInfoId)">
                                        发送
                                    </el-button>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>

                    <div class="service-no-main" v-if="knowledgeList.length == 0">
                        没有这个关键字哦！
                    </div>
                </el-tab-pane> -->
      </el-tabs>
    </div>
    <!-- 暂无会话 -->
    <div class="service-no" v-if="!showFlag">
      <div class="service-main-header"></div>
      <div :class="pageType ? 'service-no-main1' : 'service-no-main'">
        <img class="service-no-img" src="../../../assets/images/service-no.png" alt="" />
        暂无会话
      </div>
    </div>
  </div>
</template>
<script>
// 引入Chat类
import Chat from '@/utils/chat'
import { getToken } from 'ty-pc/lib/utils/auth'
import {
  getCommonTalkList,
  getKfRelationList,
  getKfMsgLogList,
  getKfPhraseList,
  modifyKfMsgLog,
  addKfMsgLog
} from '@/api/cooperation/onlineService'
import { uploadFile } from '@/api/user'
import { ONLINE_TYPE } from '@/utils/dict-enum.js'

export default {
  data() {
    return {
      pageNum: 1, // 历史记录的页面
      showFlag: false, // 聊天窗口显示标志
      uid: '', // 本身ID
      sendText: '', // 发送内容
      chat: new Chat(), // 聊天类
      clientList: [], // 客户会话
      relationList: [], // 已接待会话
      custUser: {}, // 指定客户信息
      userInfo: {}, // 用户信息
      serviceLeftTab: '0', // 选中会话
      msgLogList: [], // 聊天记录
      relationSelected: -1, // 选中的已接待会话
      recordsNum: '', // 本页最大数
      scrollFlag: true, // 滚动标志
      moreFlag: true, // 加载更多标志

      commonWordsList: [], // 常用语列表
      knowledgeList: [], // 知识库列表
      knowledgeSearch: '', // 查找知识库
      commonWordsSearch: '', // 查找常用语
      orgId: '', // 平台orgID/商家
      pageType: 0, // 0-一对多 1-一对一
      custUserName: this.$route.query.custUserName || null, // 对方的名称
      custUserId: this.$route.query.custUserId || null, // 对方的名称
      selfUserId: this.$store.state.user.userInfo.userId // 本人orgid
    }
  },
  created() {
    // custId向 商家orgId的 管理员userId发送消息
    if (this.$route.query.type === undefined) this.pageType = 0
    else this.pageType = 1
    this.orgId = this.pageType ? this.$route.query.orgId : this.$store.state.user.userInfo.orgId
    this.getUserInfo()
    // 0 常用语 ， 1 知识库
    this.getKfPhraseList(0)
    // this.getKfPhraseList(1)
    // this.getPlatInfoByAppId();
  },
  updated() {
    // 第一次打开、聊天滚动至div底部，查看更多，不滚动
    if (this.scrollFlag) {
      this.$nextTick(() => {
        setTimeout(() => {
          var div = document.getElementById('dialogue-box')
          // console.log(div)
          if (div) {
            div.scrollTop = div.scrollHeight + 100
          }
        }, 800)
      })
    }
  },
  methods: {
    // 聊天
    onlineService() {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.chat.connect(`${process.env.VUE_APP_KF_URL}/basic/cbos/kfchat`, {
        // this.chat.connect(`http://172.20.89.3:8521/basic/cbos/kfchat`, {
        // this.chat.connect(`http://172.20.91.188:8521/basic/cbos/kfchat`, {
        // this.chat.connect(`http://172.20.91.176:8521/basic/cbos/kfchat`, {
        token: getToken(),
        userType: 1,
        nickName: this.$store.state.user.userInfo.nickName,
        orgId: this.orgId,
        userId: this.pageType ? this.$route.query.userId : this.$store.state.user.userInfo.userId
      })
      // 连接成功
      this.chat.on('connectOk', (subscribe, data) => {
        console.log(data)
        loading.close()
        this.uid = this.pageType ? this.$route.query.userId : data.headers['user-name']
        // 已接待会话
        this.getKfRelationList()
        // 公共会话列表
        this.getCommonTalkList()
        // 一对多才需要订阅

        if (!this.pageType) {
          console.log('222222222222')
          // 订阅客服回话
          subscribe(`/topic/kf/${this.orgId}`, (data) => {
            console.log('222222222222clientList')
            console.log(JSON.parse(data.body))
            this.clientList = JSON.parse(data.body).data
            // console.log(JSON.parse(data.body));
          })
        }
        // 本地订阅，即本人信息
        subscribe(`/user/${this.uid}/chat/${this.orgId}`, (data) => {
          this.addMsgLog(JSON.parse(data.body).data)
          console.log('JSON.parse(data.body)')
          console.log(JSON.parse(data.body))
        })

        // 错误信息订阅
        subscribe(`/user/${this.uid}/error`, (data) => {
          console.log(data)
        })

        // 一对一时模拟点击会话触发聊天
        console.log('this.pageType')
        console.log(this.pageType)
        if (this.pageType) {
          let { nickName, userId: custId } = this.$store.state.user.userInfo
          console.log(9999999)
          this.relationChat({ nickName, custId }, 0)
        }
      })
      // 连接失败
      this.chat.on('connectError', (stompClient, error) => {
        loading.close()
        console.log(error)
      })
    },
    // 发送信息
    sendMsgFun(str, img, knowledgeId) {
      // str:发送内容 img:图片地址 knowledge:知识库
      // msgType： 0文本，1图片，3商品咨询，4知识库
      // console.log('this.type')
      // console.log(this.type)
      // console.log(str)
      // console.log(img)
      // console.log(knowledgeId)
      let message = this.type.str(str) && str != undefined ? str : this.sendText
      console.log(message)
      console.log(!message.trim() && !img && !knowledgeId)
      if (!message.trim() && !img && !knowledgeId) {
        this.$message.warning('请输入内容')

        return
      }
      const { userId } = this.$store.state.user.userInfo
      let obj = {
        message,
        image: img,
        receiver: [this.custUser.id],
        msgType: img ? '1' : '0',
        fileType: img ? '001' : '',
        adminUserId: userId
      }
      // 增加知识库回复
      if (knowledgeId != undefined) {
        obj = {
          message: '关于您咨询的问题，详情查看',
          receiver: [this.custUser.id],
          msgType: 4,
          fileType: '',
          aboutObjId: knowledgeId,
          aboutObjType: '004',
          adminUserId: userId
        }
      }
      console.log('obj')
      console.log(obj)
      obj = JSON.stringify(obj)

      this.chat.send(`/app/chat/${this.orgId}`, obj, {}, (text) => {
        // console.log(text)
      })
    },
    // 常用语|知识库列表
    // 先取分类列表 再根据ID取问题 2020/08/11
    getKfPhraseList(flag) {
      let obj = {}
      if (flag == 0) {
        obj = {
          categoryName: this.commonWordsSearch,
          phraseType: 'common_language',
          orgId: this.orgId
        }
      } else {
        obj = {
          categoryName: this.knowledgeSearch,
          phraseType: 'knowledge_base',
          orgId: this.orgId
        }
      }
      getKfPhraseList(obj).then((res) => {
        if (flag == 0) {
          this.commonWordsList = res.data
        } else {
          this.knowledgeList = res.data
        }
      })
    },
    // 获取用户信息
    getUserInfo() {
      this.onlineService()
      this.userInfo = this.$store.state.user.userInfo
    },
    // 点击客户会话
    clientChat(data) {
      // console.log(data)
      this.custUser.id = data.userId
      let [list, obj] = [[], {}]
      for (let i of data.allMsgLogInfoVOS) {
        obj = {
          content: i.message,
          msgType: i.msgType,
          readFlag: 1,
          // recieverHeadImage: this.userInfo.headImageSrc,
          recieverId: this.uid,
          recieverNick: this.userInfo.nickname,
          sendTime: i.sendTime,
          // senderHeadImage: data.headImageSrc,
          senderId: data.userId,
          senderNick: data.nickName,
          objSign: i.objSign,
          fileKey: i.fileKey,
          orgId: this.orgId
        }
        list.push(obj)
      }
      let params = {
        custUserId: data.userId,
        kfUserId: this.uid,
        userType: 1,
        kfMsgLogAddDataList: list,
        orgId: this.orgId
      }
      addKfMsgLog(params).then(() => {
        this.getKfRelationList(true)
        this.serviceLeftTab = '0'
        this.getCommonTalkList()
      })
    },
    // 点击已接待会话
    relationChat(data, index) {
      console.log('data2222')
      console.log(data)
      data.msgLogNum = 0
      this.relationSelected = index
      this.custUser.id = this.custUserId || data.custId
      this.custUser.name = this.custUserName || data.nickName
      console.log('this.custUser')
      console.log(this.custUser)
      this.recordsNum = ''
      this.getKfMsgLogList()
      this.showFlag = true
      this.scrollFlag = true
    },
    // 聊天记录列表
    getKfMsgLogList(flag) {
      let params = {
        pageSize: 10,
        pageNum: this.pageNum,
        custId: this.custUser.id,
        recordsNum: this.recordsNum,
        kfId: this.uid,
        orgId: this.orgId
      }
      console.log('params')
      console.log(params)
      getKfMsgLogList(params).then((res) => {
        console.log('res===')
        console.log(res)
        let { records, total } = res.data
        if (flag) {
          this.msgLogList = records.concat(this.msgLogList)
        } else {
          this.msgLogList = records
        }
        if (total < 10) {
          this.moreFlag = false
          return
        }
        console.log('this.moreFlag')
        console.log(this.moreFlag)
        // this.moreFlag = total != 0
        this.recordsNum = total
        //  this.moreFlag = records[0].recordsNum != 0
        // this.recordsNum = records[0].recordsNum
      })
    },
    // 客服已接待会话列表
    getKfRelationList(flag) {
      let params = {
        kfId: this.uid, // 商家是uid
        pageNum: 1,
        pageSize: 999,
        orgId: this.orgId
      }
      getKfRelationList(params).then((res) => {
        let { records } = res.data
        for (let i of records) {
          i.msgLogNum = i.msgLogNum ? i.msgLogNum : 0
        }
        this.relationList = records
        if (flag) {
          this.relationChat(records[0], 0)
        }
      })
    },
    // 获取客户的公共会话列表
    getCommonTalkList() {
      getCommonTalkList({ orgId: this.orgId }).then((res) => {
        console.log('333333333this.clientList')
        console.log(res.data)
        this.clientList = res.data
      })
    },
    // 前端往聊天记录添加数据
    addMsgLog(data) {
      if (data.objSign == 0) {
        if (this.custUser.id != data.user.userId) {
          let list = this.relationList
          // 往己接待会话添加未读标志
          for (let i of list) {
            if (i.custId == data.user.userId) {
              // this.type.num(i.msgLogNum) ? i.msgLogNum++ : (i.msgLogNum = 1)
              if (this.type.num(i.msgLogNum)) {
                i.msgLogNum++
              } else {
                i.msgLogNum = 1
              }
            }
          }
          this.relationList = list
          return
        }
      } else {
        // 客户信息
        let flag = true
        for (let i of data.receiver) {
          if (i == this.custUser.id) {
            flag = false
          }
        }
        if (flag) return
      }

      let obj = {
        content: data.message,
        msgType: data.msgType,
        readFlag: 1,
        recieverId: data.userId,
        sendTime: data.sendTime,
        // senderHeadImage: data.user.headImageSrc,
        senderId: data.user.userId,
        senderNick: data.user.nickName,
        objSign: data.objSign,
        fileKey: data.image
      }
      // 实时发送、接受的消息，前端根据判断登录人token的orgId跟客服的orgId是否一致，不一致显示在左边，一致显示在右边
      console.log('this.selfUserId == data.user.adminUserId')
      console.log(data)
      console.log('this.selfUserId')
      console.log(this.selfUserId)
      console.log('data.adminUserId')
      console.log(data.adminUserId)
      console.log(this.selfUserId == data.adminUserId)
      if (this.selfUserId == data.adminUserId) {
        obj.objSign = 1
      } else {
        obj.objSign = 0
      }
      console.log('obj')
      console.log(obj)
      this.msgLogList.push(obj)
      this.sendText = ''
      // 更改聊天状态
      let params = {
        msgId: Number(data.msgId),
        readFlag: 1
      }
      modifyKfMsgLog(params).then(() => {})
    },
    // 上传图片
    catalogImg(file) {
      uploadFile(
        this,
        {
          fileType: 1, // 上传文件类型
          fileUseType: 4, // 文件使用类型
          uploadSize: 1, // 上传文件的个数
          uploadFileSize: 2 * 1024 * 1024, // 上传文件的大小
          files: file,
          aspectRatio: false
        },
        (data) => {
          // console.log(data)
          this.sendMsgFun('', data.data.url)
          // this.sendMsgFun('', data.data.fileId)
        }
      )
      return false
    },
    // 查看更多
    lookMore() {
      this.pageNum += 1
      this.scrollFlag = false
      this.getKfMsgLogList(true)
    }
    // 获取平台orgID
    // getPlatInfoByAppId() {
    //   this.api.getPlatInfoByAppId(
    //     {
    //       appId: process.env.appId
    //     },
    //     (res) => {
    //       this.orgId = res.orgId
    //       this.getUserInfo()
    //     }
    //   )
    // }
  },
  // 离开当前页面后执行
  destroyed() {
    this.chat.disconnect()
  }
}
</script>
<style>
/* 重新element-ui样式 */
.service .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.service .el-textarea__inner {
  border: none;
}
.service .el-collapse-item__header {
  padding: 0 10px;
  border: none;
}
.service .el-collapse {
  border: none;
}
.service .el-collapse-item__content {
  padding-bottom: 0px;
}
.service .el-collapse-item__wrap {
  padding: 4px 10px;
  background: #f3f5f7;
  border: none;
}
.el-tabs__nav-wrap.is-scrollable {
  padding: 0;
}
.el-tabs__nav-wrap .el-tabs__nav-prev {
  display: none;
}
.el-tabs__nav-wrap .el-tabs__nav-next {
  display: none;
}
</style>
<style scoped lang="scss">
.service {
  color: #243247;
  font-size: 14px;
  @include df;
  &-left {
    width: 214px;
    margin-right: 10px;
    position: relative;
  }
  &-main {
    border: 1px solid #dcdfe6;
    margin-right: 10px;
    @include flex;
  }
  &-right {
    width: 280px;
  }
  &-msg-img {
    width: 200px;
    @include border-radius(4px);
  }
  &-more-btn {
    margin: 4px 0 8px;
    text-align: center;
  }
  &-no {
    @include flex;
    flex: 1;
    border: 1px solid #dcdfe6;
  }
  &-no-img {
    margin-bottom: 6px;
    @include wh(54px, 54px);
  }
  &-no-main {
    height: 100%;
    color: #a7a7a7;
    @include fcaj(center, center);
  }
  &-no-main1 {
    flex: 1;
    color: #a7a7a7;
    margin: 20px 0;
    @include fcaj(center, center);
  }
}
.service-list {
  &-item {
    padding: 10px 0 10px 10px;
    cursor: pointer;
    @include df;
  }
  &-item-select {
    background: #f5f7fa;
  }
  &-logo-con {
    margin: 6px 6px 0 0;
  }
  &-logo {
    min-width: 26px;
    //margin: 4px 6px 0 0;
    @include wh(26px);
    @include border-radius(50%);
  }
  &-main {
    width: 126px;
  }
  &-name {
    font-weight: bold;
    // @include ellipsis(1);
  }
  &-text {
    font-size: 12px;
    @include ellipsis(1);
  }
  &-time {
    margin: 0 2px;
    width: 90px;
    font-size: 12px;
    color: #c8c8c8;
  }
}
.service-main {
  &-header {
    background: #f5f7fa;
    height: 40px;
    @include df;
    @include fac;
  }
  &-header-dot {
    background: #e8c84f;
    margin: 0 8px 0 12px;
    @include wh(10px);
    @include border-radius(50%);
  }
  &-header-name {
    margin-right: 6px;
    font-size: 18px;
    font-weight: 500;
  }
  &-detail {
    padding: 10px;
    height: 320px;
    overflow-y: scroll;
    @include scrollBar;
  }
  &-item {
    margin-bottom: 20px;
  }
  &-item-content {
    @include df;
  }
  &-logo {
    min-width: 30px;
    margin-right: 10px;
    @include wh(30px);
    @include border-radius(50%);
  }
  &-text {
    position: relative;
    padding: 6px;
    background: #158af7;
    line-height: 22px;
    color: #fff;
    @include border-radius(4px);
  }
  &-text:before {
    display: block;
    content: '';
    border-width: 6px 6px 6px 6px;
    border-style: solid;
    position: absolute;
  }
  &-info {
    margin-top: 4px;
    color: #aeaeae;
    @include df;
    @include fac;
  }
  &-time {
    margin: 0 10px;
    font-size: 12px;
  }
  &-item-left {
    .service-main-item-content {
      margin-right: 42px;
    }
    .service-main-text:before {
      border-color: transparent #158af7 transparent transparent;
      left: -10px;
      top: 10px;
    }
  }
  .goods-img {
    width: 80px;
    height: 65px;
  }
  .goods-info {
    float: right;
    margin-left: 5px;
    max-width: 300px;
    .goods-name {
      height: 43px;
      @include ellipsis(2);
    }
    .goods-price {
      font-size: 18px;
      font-weight: bold;
    }
    .goods-price-icon,
    .goods-tip {
      font-weight: 400;
      font-size: 12px !important;
    }
  }
  &-item-right {
    .service-main-logo {
      margin: 0 0 0 10px;
    }
    .service-main-item-content,
    .service-main-info {
      justify-content: flex-end;
    }
    .service-main-item-content {
      margin-left: 42px;
    }
    .service-main-text {
      background: #daf0ff;
      color: #414141;
    }
    .service-main-text:before {
      border-color: transparent transparent transparent #daf0ff;
      right: -10px;
      top: 10px;
    }
  }
  &-item-left,
  &-item-right {
    .service-main-text {
      word-break: break-all;
    }
  }
  &-icon {
    padding: 10px 10px 0;
  }
  &-img {
    cursor: pointer;
    @include wh(22px);
  }
  &-send {
    border-top: 10px solid #f5f7fa;
  }
  &-btn {
    margin: 4px 10px;
    text-align: right;
  }
}
.service-common {
  &-item {
    margin-bottom: 6px;
    @include df;
    @include fac;
  }
  &-dot {
    margin-right: 6px;
    background: #324056;
    @include wh(6px);
    @include border-radius(50%);
  }
  &-text {
    width: 194px;
  }
}
.service-content {
  background: #fff;
}
.service-card {
  height: 500px;
  overflow-y: scroll;
  @include scrollBar;
}
.service-form {
  padding: 12px 4px;
}
.knowledge {
  margin: 8px;
  padding: 8px;
  border: 1px solid #e5e5e5;
  &-input {
    margin: 8px;
  }
  &-img {
    margin-right: 4px;
    @include wh(22px);
  }
  &-title {
    font-size: 14px;
    font-weight: bold;
    @include df;
    @include fac;
  }
  &-con {
    margin-top: 10px;
    @include faj(center, space-between);
  }
  &-text {
    color: #324056;
    font-size: 12px;
    line-height: 20px;
  }
}
.client-num {
  position: absolute;
  right: 0;
  z-index: 999;
  top: 6px;
}
</style>
