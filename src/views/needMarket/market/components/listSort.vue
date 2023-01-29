<template>
  <div>
    <div size="small" class="sort-line">
      <div class="sort-item" v-for="ite in sortArrTemp" :label="ite.id" :key="ite.id">
        <template v-if="ite.sort == true">
          <span :class="{ active: ite.isSort }" @click="onSort(ite)">{{ ite.name }}</span>
          <img @click.prevent="changeSort(ite, 1)" class="sort-img up" :src="getUpImg(ite)" />
          <img @click.prevent="changeSort(ite, 2)" class="sort-img down" :src="getDownImg(ite)" />
        </template>
        <span v-else @click="changeSort(ite, 2)" :class="{ active: ite.isSort != 0 }">{{
          ite.name
        }}</span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import upImg from '@/assets/images/goods/up.png'
import upImg2 from '@/assets/images/goods/up2.png'
import downImg from '@/assets/images/goods/down.png'
import downImg2 from '@/assets/images/goods/down2.png'

export default {
  props: {
    sortArr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      upImg,
      upImg2,
      downImg,
      downImg2,
      sortArrTemp: this.sortArr
    }
  },
  computed: {
    getUpImg() {
      return function (ite) {
        if (ite.isSort == 1) {
          return upImg
        }
        return upImg2
      }
    },
    getDownImg() {
      return function (ite) {
        if (ite.isSort == 2) {
          return downImg
        }
        return downImg2
      }
    }
  },
  methods: {
    cleanSort(ite) {
      this.sortArrTemp.map((item) => {
        if (ite.key != item.key) {
          item.isSort = 0
        }
      })
    },
    changeOutSort() {
      this.$emit('changeOutSort', this.sortArrTemp)
    },
    onSort(ite) {
      this.cleanSort(ite)
      if (ite.isSort < 1) {
        ite.isSort = 1
      } else if (ite.isSort == 1) {
        ite.isSort = 2
      } else if (ite.isSort == 2) {
        ite.isSort = 0
      }
      this.changeOutSort()
    },
    changeSort(ite, type) {
      this.cleanSort(ite)
      if (ite.isSort == 0) {
        ite.isSort = type
      } else if (ite.isSort != type) {
        ite.isSort = type
      } else {
        ite.isSort = 0
      }
      // 为啥默认排序ite.isSort会变成null
      this.changeOutSort()
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-line {
  padding: 4px 10px;
  border-bottom: 1px solid #dcdfe6;
}
.list-sort {
  margin-top: 55px;
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
}
.sort-item {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  margin-right: 10px;
  cursor: pointer;
  .sort-img {
    display: inline-block;
    width: 10px;
    height: 15px;
    vertical-align: text-bottom;
  }
  .up {
    margin-left: 3px;
  }
  .down {
  }
}
.iconfont {
  font-size: 8px;
  margin: 0 3px;
}
.active {
  color: #fe9400;
}
.el-icon-sort-up {
  position: relative;
  right: 8px;
}

// ::v-deep {
//   .el-checkbox-button.is-checked .el-checkbox-button__inner {
//     color: #fe9400;
//     box-shadow: none;
//     background: #fff;
//   }
//   .el-checkbox-button__inner {
//     border: none !important;
//     border-radius: 0 !important;
//     margin-right: 7px;
//     // margin-bottom: 7px;
//   }
//   .el-checkbox-button__inner:hover {
//     color: #fe9400 !important;
//   }
// }
</style>
