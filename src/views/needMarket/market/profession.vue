<template>
  <!-- 专业共建详情 -->
  <div class="pro">
    <div class="pro-top">
      <h3>{{ info.themeName }}</h3>
      <div class="pro-type">
        合作模式: {{ info.cooperationModel | cooperationModelFilter(sysCooperationModel) }}
      </div>
      <div class="pro-send">
        <div>
          <span v-if="info.releaseStatus == 1 || info.releaseStatus == 2">{{
            info.issueTime || ''
          }}</span>
        </div>
        <div>
          <el-button
            v-if="!canContact"
            type="warning"
            size="medium"
            @click="sendIntention"
            :disabled="canContact"
            >发送合作意向</el-button
          >
          <el-button
            v-if="!canContact"
            :disabled="canContact"
            type="primary"
            plain
            size="medium"
            @click="handlePushKF"
            >咨询客服</el-button
          >
        </div>
      </div>
    </div>
    <el-row class="bg-gray">
      <el-col :span="19">
        <div class="content">
          <template>
            <div class="title">发起方提供资源</div>
            <el-checkbox-group v-model="checkbox">
              <el-checkbox
                v-for="(item, index) in provideResources"
                :label="item.dictValue"
                :key="index"
                disabled
                >{{ item.dictLabel }}</el-checkbox
              >
            </el-checkbox-group>
            <p>{{ info.resourceDescriptionDto.resourcesContent }}</p>
          </template>
          <template>
            <div class="title">专业共建的目标和愿景</div>
            <p>{{ info.target }}</p>
          </template>
          <template>
            <div class="title">要求合作方提供的资源</div>
            <el-checkbox-group v-model="checkbox2">
              <el-checkbox
                v-for="(item, index) in needToResource"
                :label="item.dictValue"
                :key="index"
                disabled
                >{{ item.dictLabel }}</el-checkbox
              >
            </el-checkbox-group>
            <p>{{ info.partnerSourceDto.resourcesContent }}</p>
          </template>
          <template>
            <div class="title">合作方需具备的条件</div>
            <p>{{ info.partnerCertification }}</p>
          </template>
          <template>
            <div class="title">发起方的简介</div>
            <!-- <p v-html="" style="margin-bottom: 20px">{{ info.resourceNote }}</p> -->
            <div v-html="info.resourceNote" style="margin-bottom: 20px"></div>
            <!-- <el-image style="margin-bottom: 30px" :src="url" :preview-src-list="[url]"> </el-image> -->
          </template>
          <template>
            <div class="title">发起方荣誉证书</div>
            <div>
              <el-image
                class="elImage"
                v-for="(item, idx) in imageList"
                :key="idx"
                :src="item"
                alt=""
                :preview-src-list="imageList"
                style="width: 100px; height: 100px"
              ></el-image>
            </div>
          </template>
        </div>
      </el-col>
      <el-col :span="5" class="pro-aside">
        <div class="school-info">
          <div>{{ info.enterpriseName }}</div>
          <div>联系电话: {{ info.starterPhone }}</div>
        </div>
        <div class="major">
          相关专业
          <el-tooltip effect="dark" placement="bottom" v-if="listTooltip.length > 0">
            <div slot="content">
              <div v-for="item in listTooltip" :key="item.name" class="list">
                <div class="list-title">{{ item.themeName }}</div>
                <div class="list-item">
                  <div>地点: {{ item.area }}</div>
                  <div>{{ item.enterpriseName }}</div>
                </div>
              </div>
            </div>
            <span class="more">更多专业信息 </span>
          </el-tooltip>
          <!-- <div v-else><span class="more">更多专业信息 </span></div> -->
        </div>
        <div class="major-list">
          <div v-for="item in list" :key="item.name" class="list">
            <div class="list-title">{{ item.themeName }}</div>
            <div class="list-item">
              <div>地点: {{ item.area }}</div>
              <div>{{ item.enterpriseName }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ONLINE_TYPE } from '@/utils/dict-enum.js'
import { demandDetail } from '@/api/needMarket/market.js'
import { getDictMultiple, selectDictLabel } from '@/utils/tool.js'

export default {
  filters: {
    cooperationModelFilter(val, list) {
      return selectDictLabel(list, val) || '-'
    }
  },
  data() {
    return {
      sysCooperationModel: [],
      checkbox: [],
      checkbox2: [],
      resource: ['场地', '设备', '原料', '专业人员', '就业岗位', '内容'],
      resoureArr: ['space', 'equipment', 'material', 'personnel', 'position', 'content'],
      provideResources: [],
      needToResource: [],
      list: [],
      listTooltip: [],
      checkboxGroup: [],
      checkboxGroup2: [],
      url: '',
      imageList: [],
      form: {
        content: '',
        targetContent: '',
        partnerSourceContent: '',
        partnerCertificationContent: '',
        resourceNoteContent: ''
      },
      info: {}
    }
  },
  created() {
    this.init()
    // console.log(this.$route.query.isVisible, 'isVisible')
  },
  computed: {
    // isVisible() {
    //   if (this.$route.query.isVisible == 'owner') {
    //     return false
    //   }
    //   return true
    // },
    // 自己的就不能发给自己
    canContact() {
      const { orgId } = this.$store.state.user.userInfo
      const { enterpriseId } = this.info
      return enterpriseId == orgId
    }
  },
  methods: {
    async init() {
      const {
        sys_cooperation_model: sysCooperationModel,
        provide_resources: provideResources,
        need_to_resource: needToResource
      } = await getDictMultiple(['sys_cooperation_model', 'provide_resources', 'need_to_resource'])

      this.provideResources = provideResources
      this.needToResource = needToResource
      this.sysCooperationModel = sysCooperationModel
      this.getDemandDetail(this.$route.query.cooperationDemandId)
    },
    sendIntention() {
      this.$router.push({
        path: `/market/sendIntention?cooperationDemandId=${this.$route.query.cooperationDemandId}&recommendedEnterpriseRelId=${this.$route.query.recommendedEnterpriseRelId}`
      })
    },
    // 获取
    getDemandDetail(id) {
      demandDetail(id).then((res) => {
        if (res.code === 200) {
          console.log(res)
          let { provideResources, needToResource } = res.data
          this.info = res.data
          this.listTooltip = res.data.demandVoList
          for (var i = 0; i < 2; i++) {
            if (res.data.demandVoList[i]) {
              this.list.push(res.data.demandVoList[i])
            }
          }
          res.data.fileVoList.forEach((e) => {
            this.imageList.push(e.fileUrl)
          })
          // let resourceArr = Object.entries(res.data.resourceDescriptionDto)
          // resourceArr.forEach((item) => {
          //   if (item[1] == true) {
          //     this.checkbox.push(item[0])
          //   }
          // })
          // let partnerArr = Object.entries(res.data.partnerSourceDto)
          // partnerArr.forEach((item) => {
          //   if (item[1] == true) {
          //     this.checkbox2.push(item[0])
          //   }
          // })
          this.checkbox = provideResources ? provideResources.split(',') : []
          this.checkbox2 = needToResource ? needToResource.split(',') : []
        }
      })
    },
    // 跳转到一对一客服页
    handlePushKF() {
      let { enterpriseId: orgId, adminUserId: userId, enterpriseName: custUserName } = this.info

      this.$router.push({
        path: `/market/oneOnlineService`,
        query: {
          type: ONLINE_TYPE.PROFESSION,
          orgId, // 组织id
          userId, // 用户id
          custUserName // 对方的名称 //
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-gray {
  background: #f2f2f2;
}
.pro {
  background: #fff;
  .pro-top {
    background: #424a61;
    color: #fff;
    padding: 10px 20px;
    border-bottom: 10px solid #f2f2f2;
    .pro-type {
      color: #e6a23c;
      font-size: 14px;
    }
    .pro-send {
      font-size: 13px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #e4e7ed;
      margin-top: 17px;
      padding-top: 10px;
    }
  }
  .content {
    padding: 20px;
    background: #fff;
    .img-list {
      margin-right: 10px;
      width: 100px;
      height: 100px;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      padding-left: 10px;
      margin: 10px 0;
      border-left: 4px solid #797979;
    }
    p {
      margin-bottom: 40px;
      font-size: 14px;
    }
  }
  .pro-aside {
    padding-left: 10px;
    .school-info {
      background: #fff;
      width: 100%;
      line-height: 30px;
      // border: 1px solid #ccc;
      padding: 20px;
      // height: 350px;
    }
    .major {
      line-height: 40px;

      .more {
        float: right;
        color: #797979;
        font-size: 14px;
      }
    }
    .major-list {
      padding: 10px;
      background: #fff;
      .list {
        border-bottom: 1px solid #424a61;
        line-height: 40px;
        .list-title {
          font-weight: bold;
        }
        .list-item {
        }
      }
    }
  }
}
.elImage {
  margin-right: 15px;
}
</style>
