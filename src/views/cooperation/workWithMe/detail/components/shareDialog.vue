<template>
  <div>
    <el-dialog title="分享" :visible.sync="dialogVisibleFlag" width="30%" @close="closeDialong">
      <div>
        <h4>谁可以查看/编辑数据</h4>
        <div class="edit-check">
          <a @click="permissionType = 1" class="edit-check-item">
            <span class="check-btn">
              <i class="el-icon-check" style="color: #3176fb" v-show="permissionType === 1"></i>
            </span>
            <span>仅指定人员</span
            ><el-radio-group v-model="visitType" v-show="permissionType === 1">
              <el-radio :label="1">可查看</el-radio>
              <el-radio :label="2">可编辑</el-radio>
            </el-radio-group>
          </a>
          <a @click="permissionType = 2" class="edit-check-item">
            <span class="check-btn">
              <i class="el-icon-check" style="color: #3176fb" v-show="permissionType === 2"></i>
            </span>
            <span>所有人可查看</span>
          </a>
          <a @click="permissionType = 3" class="edit-check-item">
            <span class="check-btn">
              <i class="el-icon-check" style="color: #3176fb" v-show="permissionType === 3"></i>
            </span>
            <span>所有人可编辑</span>
          </a>
        </div>
      </div>
      <!-- <div>
        <h4>数据访问有效期</h4>
        <el-radio-group v-model="validityStatus">
          <el-radio :label="1">永久有效</el-radio>
          <el-radio :label="2">7天</el-radio>
          <el-radio :label="3">1天</el-radio>
        </el-radio-group>
      </div> -->
      <div>
        <h4>分享至</h4>
        <div class="share-btn-list">
          <div class="share-btn-item">
            <el-button icon="el-icon-s-custom" circle @click="showPeople"></el-button>
            <span>协同联系人</span>
          </div>
          <div class="share-btn-item">
            <el-button icon="el-icon-link" circle @click="copyLink"></el-button>
            <span>复制链接</span>
          </div>
          <!-- 暂时隐藏 -->
          <!-- <div class="share-btn-item">
            <el-button icon="el-icon-s-grid" circle @click="showLinkCode"></el-button>
            <span>生成二维码</span>
          </div> -->
        </div>
      </div>
    </el-dialog>
    <q-rcode
      :url="H5Url"
      :visible.sync="showCode"
      topTitle="分享二维码"
      infoTitle="分享二维码"
      v-show="showCode"
    ></q-rcode>
    <cooperate-people
      ref="people"
      :dialogVisible.sync="peopleVisible"
      @close="closeDialong"
    ></cooperate-people>
  </div>
</template>

<script>
import QRcode from '@/components/QRcode.vue'
import { shareProjectMission } from '@/api/cooperation/workWithMe.js'
import cooperatePeople from './cooperatePeople'

export default {
  components: { QRcode, cooperatePeople },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    projectMissionId: {
      type: Number,
      default: null
    }
  },

  watch: {
    dialogVisible(val) {
      this.dialogVisibleFlag = val
    }
  },
  data() {
    return {
      H5Url: null,
      url: `${process.env.VUE_APP_BASE_URL}taskIntro`,
      link: null,
      dialogVisibleFlag: this.dialogVisible,
      peopleVisible: false,
      showCode: false,
      radio: 0,
      currentIndex: 0,
      permissionType: 1,
      visitType: 1
    }
  },
  methods: {
    showPeople() {
      this.peopleVisible = true
      let { visitType, permissionType, projectMissionId } = this
      let data = {
        permissionType,
        projectMissionIds: [projectMissionId],
        projectParticipantIds: [],
        shareWay: 0,
        visitType
      }
      this.$refs.people.setData(data)
    },
    closeDialong() {
      this.$emit('update:dialogVisible', false)
    },
    // 二维码弹窗
    showLinkCode() {
      // this.H5Url =
      this.showCode = true
    },
    async copyLink() {
      let that = this
      let { visitType, permissionType, projectMissionId } = this
      // let data = {
      //   visitType
      // }

      // this.link = `${this.url}?projectMissionId=${projectMissionId}&&permissionType=${permissionType}`
      // base64加密
      this.link = `${this.url}?info=${this.$Base64.encode(
        JSON.stringify({
          projectMissionId,
          permissionType,
          // 自己复制自己打开的权限
          selfVisitType: visitType
        })
      )}
`
      console.log('link')
      console.log(this.link)
      let data = {
        permissionType,
        projectMissionIds: [projectMissionId],
        shareWay: 1
      }
      console.log(data)
      const res = await shareProjectMission(data)
      this.$copyText(this.link).then(
        function (e) {
          that.$message.success('复制到粘贴板成功')
        },
        function (e) {
          that.$message.error('复制失败')
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.share-btn-list {
  @include faj(center, flex-start);
  .share-btn-item {
    padding: 0 20px;
    @include fcaj(center, flex-start);
    span {
      padding-top: 10px;
    }
  }
}
.edit-check {
  @include fcaj(flex-start, flex-start);
  .edit-check-item {
    height: 40px;
    padding: 10px 0;
  }
}
.check-btn {
  display: inline-block;
  width: 30px;
}
</style>
