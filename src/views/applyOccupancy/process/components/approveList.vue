<template>
  <div class="approve-list">
    <div v-if="authStatus == 0 || !authStatus">
      <el-image class="img" :src="waitingImg"></el-image>
      <h3>等待平台审核</h3>
    </div>
    <div v-if="authStatus == 1">
      <i class="el-icon-success success-icon"></i>
      <h3>审核通过</h3>
    </div>
    <div v-if="authStatus == 2">
      <i class="el-icon-warning warning-icon"></i>
      <h3>审核不通过</h3>
    </div>

    <div class="list">
      <h3>申请进度:</h3>
      <el-steps direction="vertical" :active="getActive" space="100" align-center>
        <el-step
          v-for="(item, index) in list"
          :key="item.enterpriseAuditId"
          :title="getTitle(item)"
        >
          <div slot="description" v-if="item.auditStatus == 2 && index == list.length - 1">
            <el-button type="text" @click="applyAgain">重新申请</el-button>
          </div>
          <div slot="icon" class="active"></div>
        </el-step>
      </el-steps>
    </div>
    <div class="back" @click="navigater('/')">回到首页</div>
  </div>
</template>

<script>
import { enterpriseAuditList, enterprises } from '@/api/applyOcupancy/process'
import waitingImg from '@/assets/images/approval/waiting.png'

export default {
  props: {
    unitInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    enterpriseId: {
      type: Number,
      default: null
    },
    authStatus: {
      // 审核状态 0待审核 1审核通过 2审核未通过
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      waitingImg,
      list: []
    }
  },
  computed: {
    getActive() {
      return this.list.length - 1
    },
    getTitle() {
      return (item) => {
        return `${item.event} ${item.createTime}`
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await enterpriseAuditList({ type: 2, enterpriseId: this.enterpriseId })
      this.list = [...res.data.records].reverse()
    },
    applyAgain() {
      this.$emit('changTab', 0)
    }
  }
}
</script>

<style lang="scss" scoped>
// .is-process .active {
//   width: 108%;
//   height: 106%;
//   background: #3176fb;
//   border-radius: 50%;
// }
.approve-list {
  text-align: center;

  .img {
    width: 140px;
    height: 140px;
  }
  .success-icon {
    font-size: 140px;
    color: #06dd7d;
  }
  .warning-icon {
    font-size: 140px;
    color: #ff9933;
  }
  .list {
    width: 50%;
    margin: 60px auto 0;
    padding: 10px 20px;
    text-align: left;
    background: #f2f2f2;
    .el-steps {
      margin-left: 100px;
    }
  }
  .back {
    color: #606266;
    margin-top: 20px;
    cursor: pointer;
  }
}
/deep/.is-process {
  border-color: #3176fb !important;
}
::v-deep {
  .is-process .is-text {
    background: #3176fb;
  }
  .el-step.is-vertical .el-step__main {
    min-height: 57px;
  }
}
</style>
