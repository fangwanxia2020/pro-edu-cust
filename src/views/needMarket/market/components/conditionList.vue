<template>
  <div>
    <div
      v-for="item in list"
      :key="item.cooperationDemandId"
      class="porject-list"
      @click="toDetail(item)"
    >
      <el-row>
        <el-col :span="20"
          ><div class="list-info">
            <span class="list-title">{{ item.themeName }}</span>
            <span
              >合作模式:
              {{ item.cooperationModel | cooperationModelFilter(sysCooperationModel) }}</span
            >
            <span>合作地区: {{ item.area }} </span> <span>匹配度: {{ item.suitability }}</span>
            <span>时间: {{ item.issueTime }}</span>
            <span>浏览量: {{ item.pv }}</span>
            <span>沟通次数: {{ item.comNumber }}</span>
          </div></el-col
        >
        <el-col :span="4" class="flex">
          <span class="next" :title="item.enterpriseName">{{ item.enterpriseName }}</span> ></el-col
        >
      </el-row>
      <div>
        要求合作方提供资源:
        <!-- <el-checkbox-group v-model="item.newArr" disabled>
          <el-checkbox v-for="(res, index) in resource" :label="resoureArr[index]" :key="res">{{
            res
          }}</el-checkbox>
        </el-checkbox-group> -->
        <el-checkbox disabled v-for="(res, index) in item.newArr" :key="index" v-model="checked">{{
          res
        }}</el-checkbox>
      </div>
      <div>
        <el-tag type="info" v-for="(ite, index) in item.otArr" :key="index">{{ ite }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { selectDictLabel, getDictMultiple } from '@/utils/tool'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    sysCooperationModel: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    cooperationModelFilter(val, list) {
      return selectDictLabel(list, val) || '-'
    }
  },
  created() {
    this.getList()
  },
  data() {
    return {
      checked: true,
      resource: ['场地', '设备', '原料', '专业人员', '就业岗位', '内容'],
      resoureArr: ['space', 'equipment', 'material', 'personnel', 'position', 'content'],
      type: [],
      tapList: []
    }
  },
  methods: {
    // 标签回显
    async getList() {
      console.log(888888)

      const { need_to_resource: type } = await getDictMultiple(['need_to_resource'])
      this.type = type
      this.tapList = [...type]
      console.log(this.tapList, 'tap')
    },
    toDetail(data) {
      this.$router.push({
        path: `/market/profession?cooperationDemandId=${data.cooperationDemandId}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.next {
  display: inline-block;
  width: 90%;
  text-align: right;
  @include ellipsis(1);
}
.porject-list {
  border-bottom: 10px solid #f0f1f4;
  line-height: 32px;
  font-size: 14px;
  padding: 20px 10px;
  cursor: pointer;
  .list-title {
    font-size: 16px;
    font-weight: bold;
  }
  .list-info {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    span {
      margin-right: 50px;
    }
  }
  .list-tip {
    display: inline-block;
    background: #f2f2f2;
    font-size: 12px;
    margin-right: 10px;
    padding: 3px 12px;
    line-height: 18px;
  }
}
</style>
