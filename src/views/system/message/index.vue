<template>
  <!-- 站内消息 -->
  <div class="activity-management-list">
    <ty-business-crud
      v-if="columns"
      :id="'supplierId'"
      class="high-search-crud"
      mainKey="ty-list"
      searchMode="high"
      search-mode="default"
      :getListInterface="getListInterface"
      :columns="columns"
      :showSearchFields="[
        'transceiver',
        'msgTitle',
        'title',
        'sendTime'
      ]"
      :showIndex="true"
      :showSelect="true"
      :showOperation="[]"
      title=""
      :border="false"
      @resetSearch="resetSearchFun"
      @highSearchChange="highSearchChangeFun"
      @checkedChange="handleSelectionChange"
      ref="supplierCrud"
    >
      <template #btnsBar>
        <div class="btns-bar">
          <el-button
            type="primary"
            size="small"
            @click="addSupplier()"
          >新增</el-button>
          <el-button
            size="small"
            @click="deleteSupplier"
          >删除</el-button>
        </div>
      </template>
      <template #rowOperator="{ row }">
        <div>
          <el-button
            size="mini"
            type="text"
            @click="editSupplier(row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="deleteSupplier(row)"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            @click="detailSupplier(row)"
          >查看详情</el-button>
        </div>
      </template>
    </ty-business-crud>
  </div>
</template>
<script>
import {
  getColumns
}
from "./jsonData.js";

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      columns: null,
      getListInterface: {
        url: "/yanxue/supplier/list",
        methodType: "get",
        params: {
          pageSize: 10,
          pageNum: 1
        },
        resFormatFun: this.getListResFormatFun,
      },
      searchDateRangShow: false,
      selectRows: [],
      // searchDateRang: null, // 最近交货日期
    }
  },
  computed: {

  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.columns = await getColumns();
    },
    //高级搜索切换展开收起方法
    highSearchChangeFun(val) {
      this.searchDateRangShow = val;
    },
    // 格式化列表返回值
    getListResFormatFun(res) {
      // console.log(res);
      // return {
      //   list: res.data.records,
      //   total: res.data.total
      // };
    },
    //重置查询
    resetSearchFun() {
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // console.log(selection)
      this.selectRows = selection;
    },
    //新增
    addSupplier() {
      this.newWindow('');
    },
    //删除
    deleteSupplier(row) {
    },
    //编辑
    editSupplier(row) {
    },
    //详情
    detailSupplier(row) {
    },
  }
}

</script>
<style
  scoped
  lang="scss"
>
.high-search-crud ::v-deep {
  .searchBox-high-operator-bar {
    display: none;
  }
}

</style>
