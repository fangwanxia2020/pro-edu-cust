<!--  -->
<template>
  <div class="material-edit design-form-wrap">
    <div class="design-form-wrap__ctnwrap">
      <!-- <div class="design-form"> -->
      <section class="info">
        <span>发送渠道：{{ msgInfo.msgType === 0 ? '站内信' : '短信' }}</span>
        <span>发送人数：{{ msgInfo.sendAmount || 0 }}</span>
        <span class="read">已读人数：{{ msgInfo.readAmount || 0 }}</span>
        <span class="unread">未读人数：{{ msgInfo.unReadAmount || 0 }}</span>
        <div class="personnel-box" v-if="msgInfo.imMsgRangeVos">
          <p>已选人员：</p>
          <el-tag
            v-for="(item, index) in msgInfo.imMsgRangeVos"
            :key="index"
            :type="item.receiverType === 0 ? '' : 'danger'"
            @close="handleClose(item)"
          >
            <!-- closable -->
            {{ item.receiverName }}
          </el-tag>
        </div>
      </section>

      <section class="line"></section>
      <section class="content-box">
        <div class="title">
          <h2>{{ msgInfo.title }}</h2>
          <p>{{ msgInfo.createTime }}</p>
        </div>
        <div class="content" v-html="msgInfo.content"></div>
      </section>
      <!-- </div> -->
    </div>
    <div class="design-form-wrap__btnwrap">
      <!-- <el-button size="small" type="primary" @click="handleSubmit"
        >保存</el-button
      > -->
      <el-button size="small" @click="goBack">返回 </el-button>
    </div>
  </div>
</template>

<script>
import { getImMsgInfo } from '@/api/system/information'

export default {
  name: '',
  components: {},
  data() {
    return {
      tags: [
        { name: '标签一', id: '1', type: '' },
        { name: '标签五', id: '2', type: 'danger' }
      ],
      contentText:
        '<h4>尊敬的客户：您好！</h4>   <p> 根据ICANN（互联网名称与数字地址分配机构）《通用顶级域名注册数据临时政策细则（Temporary Specification for gTLD Registration Data）》和欧盟通用数据保护条例（GDPR）合规要求，自2018年5月25日起，阿里云的域名WHOIS信息公开查询结果中将不再显示域名注册人/注册机构的名称，以及域名注册人/注册机构、管理联系人和技术联系人的联系信息。</p><p> 鉴于以上调整措施生效后，域名注册信息将默认得到保护，阿里云域名隐私保护服务将自2018年5月25日起暂停服务。</p>',
      msgId: null,
      msgInfo: null, // 消息详情
      name: null
    }
  },
  created() {
    const { msgId, name } = this.$route.query
    this.msgId = msgId
    this.name = name || null
    this.getImMsgInfo()
    console.log(this.$route.query)
  },
  mounted() {},
  watch: { data(newData, oldData) {} },
  computed: {
    // name() {return this.data }
  },
  methods: {
    // 获取消息详情
    getImMsgInfo() {
      getImMsgInfo(this.msgId).then((res) => {
        this.msgInfo = res.data
      })
    },
    goBack() {
      if (this.name === 'inside') {
        this.navigater(`/system/insideInfoManage`)
        return
      }
      if (this.name === 'tpl') {
        this.navigater(`/system/tplStore`)
        return
      }
      this.navigater(`/system/infoManage`)
    },
    handleClose(tag) {
      console.log(tag, 'ppppp')
      this.tags.some((item, index) => {
        if (item.id === tag.id) {
          this.tags.splice(index, 1)
          return true
        }
      })
      // this.tags.splice(this.tags.id.indexOf(tag.id), 1);
    },
    // 保存
    handleSubmit() {
      this.$refs.generateForm
        .getData()
        .then((data) => {
          data.drillDate =
            data.drillDate.length > 12 ? data.drillDate : `${data.drillDate} 00:00:00`
          data.makeDate = data.makeDate.length > 12 ? data.makeDate : `${data.makeDate} 00:00:00`

          // 附件
          data.fileIds = data.acceptFile
            ? data.acceptFile
                .map((item) => {
                  return item.id
                })
                .join(',')
            : null
          delete data.persons
          delete data.deptName
          delete data.title
          // 新增
          if (this.getPathRoute('add')) return this.addData(data)

          // 修改
          if (this.getPathRoute('update')) return this.updateData(data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.info {
  padding: 36px 46px 50px 46px;
  span {
    margin-right: 30px;
  }
  .read {
    color: rgb(0, 223, 83);
  }
  .unread {
    color: rgb(255, 122, 1335);
  }
  .personnel-box {
    //  display: flex;
    //  padding: 1px;
    //  align-items: center;
    //  border: 1px solid red;
    p {
      display: inline-block;
    }
    span {
      background: none;
      font-size: 12px;
      margin-right: 8px;
      border-radius: 10px;
    }
  }
}
.line {
  height: 10px;
  background-color: #f4f4f4;
}
.content-box {
  .title {
    height: 135px;
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
    padding-top: 10px;
  }
  .content {
    padding: 20px 0 60px 0;
  }
}
</style>
