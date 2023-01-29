<template>
  <div class="list">
    <div
      v-for="item in list"
      :key="item.cooperationDemandId"
      class="porject-list"
      @click="toDetail(item)"
    >
      <div class="item">
        <!-- <img class="pic" src="@/assets/images/404_images/404.png" /> -->
        <img class="pic" :src="item.mainImg" />
        <div class="price">{{ item.minPrice }}</div>
        <!-- <el-tooltip effect="light" :content="item.name" placement="top-start"> -->
        <div class="one-line" :title="item.name">{{ item.name || '-' }}</div>
        <!-- </el-tooltip> -->

        <div class="list-tip one-line" :title="item.sysOrg.orgName">
          {{ item.sysOrg.orgName || '-' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectDictLabel } from '@/utils/tool.js'
import { getToken } from 'ty-pc/lib/utils/auth'

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
  data() {
    return {
      token: getToken()
    }
  },
  methods: {
    toDetail(data) {
      if (this.token) {
        this.$router.push({
          path: `/service/goodsDetail?goodsId=${data.goodsId}`
        })
      } else {
        // 没登录
        this.$router.push({
          path: `/needMarketDetail?goodsId=${data.goodsId}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fr {
  float: right;
}
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
}
.porject-list {
  // border-bottom: 10px solid #f0f1f4;
  line-height: 26px;
  font-size: 14px;
  padding: 10px 10px;
  cursor: pointer;
  width: 20%;
  min-width: 250px;
  // margin: 10px;

  .item {
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    // box-shadow: 0px 1px 5px #ccc;
    div {
      padding: 0 10px;
    }
  }
  // background: red;
  .pic {
    width: 100%;
    // width: 280px;
    height: 222px;
  }
  .price {
    font-size: 16px;
    font-weight: bold;
    color: #fe9400;
  }
  .one-line {
    @include ellipsis(1);
  }

  .list-tip {
    color: #82848a;
    font-size: 11px;
  }
}
</style>
