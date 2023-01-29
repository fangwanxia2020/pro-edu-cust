<template>
  <div class="boards">
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="top-list" :gutter="5">
          <div class="list" @click="navigater('/profession/construction')">
            <img class="img" :src="firstImg" alt="" />
            <div>
              <div>发布专业数量</div>
              <div class="num">{{ issueCount }}</div>
            </div>
          </div>
          <div class="list" @click="navigater('/cooperation/intention')">
            <img class="img" :src="sedImg" alt="" />
            <div>
              <div>收到合作意向数</div>
              <div class="num">{{ cooperateCount }}</div>
            </div>
          </div>
          <div class="list" @click="navigater('/cooperation/abilityMatch')">
            <img class="img" :src="thiImg" alt="" />
            <div>
              <div>与我能力匹配数</div>
              <div class="num">{{ abilityCount }}</div>
            </div>
          </div>
          <div class="list" @click="navigater('/cooperation/needMatch')">
            <img class="img" :src="fourImg" alt="" />
            <div>
              <div>与我需求匹配数</div>
              <div class="num">{{ needCount }}</div>
            </div>
          </div>
          <div class="list" @click="navigater('/contractManagemant/customerContracts')">
            <img class="img" :src="fivImg" alt="" />
            <div>
              <div>签订合同数</div>
              <div class="num">{{ contract }}</div>
            </div>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="table-list bg">
              <div class="title">
                <span class="title-name">专业被浏览次数</span
                ><span class="time">截止统计时间2020-04-27</span><span> 查看更多 ></span>
              </div>
              <el-table :data="cooperationDemandList">
                <el-table-column prop="themeName" label="专业名称" width="180"> </el-table-column>
                <el-table-column prop="pv" label="被浏览次数"> </el-table-column>
                <el-table-column prop="releaseStatus" label="状态">
                  <template slot-scope="{ row }">
                    <span>{{ releaseStatusText(row.releaseStatus) }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div></el-col
          >
          <el-col :span="12"
            ><div class="table-echarts bg">
              <div class="title-name">寻求合作商资源</div>
              <div id="myChart" :style="{ width: '100%', height: '320px' }"></div></div
          ></el-col>
        </el-row>
        <el-row>
          <div class="bg process">
            <div class="title">
              <span class="title-name">合作事项</span>
              <el-button type="text" @click="processDetail">查看更多 ></el-button>
            </div>
            <peocess :list="coList"></peocess>
          </div>
        </el-row>
      </el-col>
      <el-col :span="4">
        <div class="task-list">
          <h4>待办任务</h4>
          <div
            v-for="(item, index) in taskList"
            :key="index"
            @click="navigater(item.url)"
            :class="['task-item', item.url ? 'cp' : '']"
          >
            <i :class="item.icon"></i>
            <div class="item-title">
              {{ item.title }}
            </div>
            <span class="item-value">
              <span>(</span><span class="item-value-number">{{ item.value }}</span
              ><span>)</span>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import firstImg from '@/assets/images/boards/1.png'
import sedImg from '@/assets/images/boards/2.png'
import thiImg from '@/assets/images/boards/3.png'
import fourImg from '@/assets/images/boards/4.png'
import fivImg from '@/assets/images/boards/5.png'
import { demandCount } from '@/api/boards/boards.js'
import { getDictMultiple, selectDictLabel } from '@/utils/tool'
import getOption from './boards'
import peocess from './components/progress.vue'

export default {
  components: { peocess },
  computed: {
    releaseStatusText() {
      return function (val) {
        return selectDictLabel(this.sysCooperationReleaseStatus, val) || '-'
      }
    }
  },
  data() {
    return {
      firstImg,
      sedImg,
      thiImg,
      fourImg,
      fivImg,
      coList: [],
      issueCount: 0, // 发布专业数量
      cooperateCount: 0, // 收到合作意向数
      abilityCount: 0, // 与我能力匹配
      needCount: 0, // 与我需求匹配
      contract: 0, // 签订合同书
      cooperationDemandList: [], // 招募中专业列表浏览量前5条
      sysCooperationReleaseStatus: [],
      taskList: [
        {
          title: '跟进提醒',
          value: 0,
          icon: 'el-icon-bell',
          url: '/cooperation/remind'
        },
        {
          title: '合作意向',
          value: 0,
          icon: 'el-icon-document-copy',
          url: '/cooperation/intention'
        },
        {
          title: '推荐客户',
          value: 0,
          icon: 'el-icon-user',
          url: '/cooperation/needMatch'
        },
        {
          title: '招聘简历',
          value: 0,
          icon: 'el-icon-edit',
          url: ''
        }
      ]
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // this.drawLine()
  },
  methods: {
    async init() {
      const { sys_cooperation_releaseStatus: sysCooperationReleaseStatus } = await getDictMultiple([
        'sys_cooperation_releaseStatus'
      ])
      this.sysCooperationReleaseStatus = sysCooperationReleaseStatus
      this.getDemandCount()
    },
    async drawLine(data) {
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      const option = await getOption(data)
      if (option) myChart.setOption(option)
      window.onresize = function () {
        myChart.resize()
      }
    },
    processDetail() {
      this.$router.push({
        path: '/cooperation/cooperativeManage'
      })
    },
    getDemandCount() {
      demandCount().then((res) => {
        if (res.code === 200) {
          console.log(res)
          const {
            issueCount,
            cooperateCount,
            abilityCount,
            needCount,
            contract,
            cooperationDemandList,
            projectMissionList,
            space,
            equipment,
            material,
            personnel,
            position,
            content,
            followCount,
            customerCount
          } = res.data
          this.issueCount = issueCount
          this.cooperateCount = cooperateCount
          this.needCount = needCount
          this.contract = contract
          this.abilityCount = abilityCount
          this.cooperationDemandList = cooperationDemandList
          this.coList = projectMissionList
          const categoryData = [space, equipment, material, personnel, position, content]
          this.drawLine(categoryData)
          this.taskList[0].value = followCount
          this.taskList[1].value = cooperateCount
          this.taskList[2].value = customerCount
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.boards {
  overflow-x: hidden;
}
.task-list {
  padding: 20px;
  background: #fff;
  .cp {
    cursor: pointer;
  }
  .task-item {
    padding: 15px 20px;
    margin-bottom: 20px;
    background: #f5f5fd;
    @include faj(center, space-between);
    border-bottom: 1px solid #ccc;

    .item-title {
      margin-left: 10px;
      display: inline-block;
      .item-name {
        display: inline-block;
      }
    }
    .item-value {
      &-number {
        color: red;
      }
    }
  }
}
.bg {
  background: #fff;
  padding: 20px;
}
.top-list {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .list {
    width: 19.2%;
    display: flex;
    flex-direction: row;
    line-height: 25px;
    cursor: pointer;
    background: #fff;
    padding: 10px;
  }
  .img {
    display: inline-block;
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  .num {
    font-weight: bold;
    font-size: 20px;
  }
}
.table-list {
  height: 350px;
  .title {
    span {
      display: inline-block;
      width: 30%;
      text-align: right;
      font-size: 14px;
    }
    .time {
      width: 40%;
    }

    .title-name {
      text-align: left;
    }
  }
}
.table-echarts {
  height: 350px;
}
.el-row {
  margin-bottom: 20px;
}
.title-name {
  font-weight: bold;
  font-size: 17px;
}
.process {
  .title {
    @include faj(center, space-between);
    span {
      display: inline-block;
      width: 33%;
      text-align: right;
      font-size: 14px;
    }
    .title-name {
      text-align: left;
    }
  }
}
</style>
