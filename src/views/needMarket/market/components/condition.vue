<template>
  <div>
    <div class="line"></div>
    <div class="condition">
      <el-row>
        <el-col :span="2"><span>提供资源: </span></el-col>
        <el-col :span="20"
          ><el-checkbox-group
            v-model="form.provideResourcesArr"
            size="small"
            @change="changeCheckBox($event, 'provideResourcesArr')"
          >
            <el-checkbox-button
              v-for="ite in needToResourceOption"
              :label="ite.dictValue"
              :key="ite.dictValue"
              >{{ ite.dictLabel }}</el-checkbox-button
            >
          </el-checkbox-group></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="2"><span>需要资源: </span></el-col>
        <el-col :span="20"
          ><el-checkbox-group
            v-model="form.needToResourceArr"
            size="small"
            @change="changeCheckBox($event, 'needToResourceArr')"
          >
            <el-checkbox-button
              v-for="ite in provideresourcesOption"
              :label="ite.dictValue"
              :key="ite.dictValue"
              >{{ ite.dictLabel }}</el-checkbox-button
            >
          </el-checkbox-group></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="2"><span>合作地区: </span></el-col>
        <el-col :span="10"
          ><el-checkbox-group
            v-model="form.codeArr"
            size="small"
            @change="changeCheckBox($event, 'codeArr')"
          >
            <el-checkbox-button
              v-for="ite in addressListOption"
              :label="ite.regionName"
              :key="ite.regionId"
              >{{ ite.regionName }}</el-checkbox-button
            >
          </el-checkbox-group>
        </el-col>
        <!-- 所在省 -->
        <el-col :span="10">
          <el-select
            size="mini"
            v-model="form.province"
            @change="renderRegionData('cities', form.province, true)"
            clearable
          >
            <el-option
              v-for="province in provinces"
              :key="province.regionId"
              :label="province.regionName"
              :value="province.regionCode"
            />
          </el-select>
          <!-- 所在市 -->
          <el-select v-model="form.city" size="mini" clearable>
            <el-option
              v-for="city in cities"
              :key="city.regionName"
              :label="city.regionName"
              :value="city.regionName"
            />
          </el-select>
          <!-- <el-button size="mini">确定</el-button> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><span>企业类型: </span></el-col>
        <el-col :span="20"
          ><el-checkbox-group
            v-model="form.enterpriseTypeTemplateIdArr"
            size="small"
            @change="changeCheckBox($event, 'enterpriseTypeTemplateIdArr')"
          >
            <el-checkbox-button
              v-for="ite in enterpriseListOption"
              :label="ite.enterpriseTypeTemplateId"
              :key="ite.enterpriseTypeTemplateId"
              >{{ ite.name }}</el-checkbox-button
            >
          </el-checkbox-group></el-col
        >
      </el-row>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import { getDictMultiple } from '@/utils/tool'
import { enterpriseTypeTemplateList } from '@/api/applyOcupancy/process'
import { getRegionInfo, getMoreFile } from '@/api/companyBasicInfo'
import { MENU_TYPE } from '@/utils/dict-enum'

export default {
  props: {
    projectCondition: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        needToResourceArr: [],
        provideResourcesArr: [],
        codeArr: [],
        enterpriseTypeTemplateIdArr: [],
        city: null,
        province: null
      },
      provideresourcesOption: [],
      needToResourceOption: [],
      enterpriseListOption: [],
      addressListOption: [],
      provinces: [],
      cities: []
    }
  },
  watch: {
    form: {
      handler(newValue) {
        // 修改查询参数
        this.$emit('changeParams', this.form)
      },
      deep: true
    }
  },
  created() {
    this.init()
    this.renderEditData()
  },
  methods: {
    // 选全部就清空
    changeCheckBox(e, key) {
      console.log('e')
      console.log(e)
      if (e.length > 1 && (e[0] == null || e[0] == '全部')) {
        this.form[key] = e.slice(1)
        return
      }
      if (e.length && e[e.length - 1] == null) {
        this.form[key] = [null]
      }
      // 地址
      if (e.length && e[e.length - 1] == '全部') {
        this.form[key] = ['全部']
        this.form.city = null
        this.form.province = null
        this.cities = []
      }
    },
    async init() {
      const { provide_resources: provideresources, need_to_resource: needToResource } =
        await getDictMultiple(['provide_resources', 'need_to_resource'])
      this.provideresourcesOption = [{ dictValue: null, dictLabel: '全部' }, ...provideresources]
      this.needToResourceOption = [{ dictValue: null, dictLabel: '全部' }, ...needToResource]
      enterpriseTypeTemplateList({ type: MENU_TYPE.ENTER, level: 2 }).then((res) => {
        this.enterpriseListOption = [
          { enterpriseTypeTemplateId: null, name: '全部' },
          ...res.data.records
        ]
      })
    },
    async renderEditData() {
      this.renderRegionData('provinces', '000000')
      // 拿广东前几个地区
      getRegionInfo({
        regionSuperiorCode: '440000'
      }).then((res) => {
        this.addressListOption = [
          { regionCode: '000000', regionId: 1, regionName: '全部' },
          ...res.data
        ].slice(0, 6)
      })
    },

    /**
     * 渲染地区数据
     * @param {string} region editData 数据中地区属性名
     * @param {string} regionSuperiorCode 地区上级代码
     * @param {boolean} [isSelect=false] 是否为手动选择数据
     * @returns {Promise<void>}
     */
    async renderRegionData(region, regionSuperiorCode, isSelect = false) {
      console.log('regionSuperiorCode')
      console.log(regionSuperiorCode)
      console.log(region)
      if (regionSuperiorCode) {
        const res = await getRegionInfo({
          regionSuperiorCode
        }).catch((err) => err)
        if (res.code !== 200) return
        this[region] = res.data
      } else {
        this[region] = []
      }
      if (!isSelect) return
      // 确保每次选地区的时候对应的下级地区数据正确，强制用户重新选择
      switch (region) {
        case 'cities':
          this.form.city = ''

          break
        // case 'counties':
        //   break
        // case 'streets':
        //   basicInfo.street = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  height: 10px;
  width: 100%;
  background: #f0f1f4;
}
.condition {
  padding: 20px;
  line-height: 30px;
}
::v-deep {
  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    background: #fe9400;
    box-shadow: none;
  }
  .el-checkbox-button__inner {
    background: #f2f2f2;
    border: none !important;
    border-radius: 0 !important;
    margin-right: 7px;
    margin-bottom: 10px;
  }
  .el-checkbox-button__inner:hover {
    color: #909399 !important;
  }
}
</style>
