<template>
  <!-- 商品详情 -->
  <div class="page">
    <div class="goods">
      <el-row :gutter="20">
        <el-col :span="9" class="goods-pic">
          <div>{{ saleCatalogName }}</div>
          <div class="pic-box">
            <img class="pic" :src="tempImg" />
          </div>

          <swiper
            :options="swiperOption"
            ref="mySwiper"
            @click="changeImg"
            v-if="goodsInfoVO.photos && goodsInfoVO.photos.length"
          >
            <swiper-slide v-for="(item, index) in goodsInfoVO.photos" :key="index">
              <img class="item-img" :src="item"
            /></swiper-slide>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </el-col>
        <el-col :span="10"
          ><div class="content">
            <div class="good-name">{{ goodsInfoVO.name }}</div>
            <div class="price">
              价格 <span class="price-yuan">¥</span><span class="price-num">{{ price }}</span>
            </div>
            <!-- 只有一个可以选 -->
            <div class="goods-label" v-if="isSigleGoods">
              采购数量
              <el-input-number
                v-model="goodList[0].amount"
                :min="0"
                :precision="0"
                :max="goodList[0].stockNum"
              ></el-input-number>
            </div>
            <!-- 多个格式 -->
            <div v-else>
              <div class="type">
                <span class="label-text">规格</span>
                <div :class="{ 'hide-all': !showAll }">
                  <el-row class="type-list" v-for="(item, index) in goodList" :key="index">
                    <el-col :span="17">
                      <div class="attr-list">
                        <span class="attr-item" v-for="ite in item.attrNameList" :key="ite">{{
                          ite
                        }}</span>
                        <span class="attr-item2">¥{{ item.price }}</span>
                      </div></el-col
                    >
                    <!-- <el-col :span="4"
                      ><div class="">¥{{ item.price }}</div></el-col
                    > -->

                    <el-col :span="7">
                      <!-- precision="0" -->
                      <!-- :min="0"
                      :max="item.stockNum" -->
                      <el-input-number
                        v-model="item.amount"
                        :max="item.stockNum"
                        :min="0"
                        :precision="0"
                        style="width: 100%"
                        @focus="changePrice($event, item)"
                        @change="changePrice($event, item)"
                      ></el-input-number
                    ></el-col>
                  </el-row>
                </div>
                <div v-if="goodList.length > 3" class="show-all" @click="showAll = !showAll">
                  <i :class="showAll ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                </div>
                <div class="total-content">
                  <!-- <el-table
                  height="250"
                  class="total-list"
                  v-show="showChoose"
                  :data="tableData"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="color" label="规格"> </el-table-column>
                  <el-table-column prop="amount" label="数量"> </el-table-column>
                  <el-table-column prop="address" label="具体"> </el-table-column>
                </el-table> -->
                  <div class="total">
                    <span class="main-color">{{ totalCount }}件</span> |
                    <span class="main-color">¥{{ totalPrice }}</span>
                    <!-- <span
                    class="has-choose"
                    :class="{ 'show-choose': showChoose }"
                    @click="showChoose = !showChoose"
                    >已选清单 <i class="el-icon-arrow-down"></i
                  ></span> -->
                  </div>
                </div>
              </div>
              <!-- <div class="color-text goods-label">规格</div> -->
            </div>
            <div class="btn-list">
              <el-button class="buy-btn goods-btn" type="warning" size="medium" @click="toOrder()"
                >采购</el-button
              >
              <el-button class="contact-btn goods-btn" plain size="medium" @click="handlePushKF"
                >在线客服</el-button
              >
            </div>
          </div></el-col
        >
        <el-col :span="5">
          <div class="company-info">
            <p>{{ goodsInfoVO.sysOrg.orgName }}</p>
            <p>联系电话：{{ goodsInfoVO.sysOrg.phone }}</p>
          </div>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName">
        <el-tab-pane label="详情信息" name="first">
          <div v-if="goodsInfoVO.detailText" v-html="goodsInfoVO.detailText"></div>
          <div v-else>暂无内容</div>
        </el-tab-pane>
        <el-tab-pane label="购买须知" name="second">
          <div v-if="goodsRelColumn.length">
            <div v-for="(item, index) in goodsRelColumn" :key="index">
              <h4>{{ item.name }}</h4>
              <div v-html="item.note"></div>
              <ty-upload-file disabled v-model="item.urlList" class="file-upload"> </ty-upload-file>
              <!-- <div class="download" v-if="item.url" @click="download(item)">下载文件</div> -->
            </div>
          </div>
          <div v-else>暂无内容</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getGoodsPreView, saleCatalog } from '@/api/needMarket/service.js'
import { getDictMultiple, selectDictLabel } from '@/utils/tool.js'
import tempImages from '@/assets/images/404_images/404.png'
// 引入插件
import { swiper, swiperSlide } from 'vue-awesome-swiper'

// 会报错 import 'swiper/dist/css/swiper.css'
import '@/assets/styles/swiper.scss'
import { getToken } from 'ty-pc/lib/utils/auth'

export default {
  components: {
    swiper,
    swiperSlide
  },
  filters: {},
  data() {
    return {
      saleCatalogName: '',
      activeName: 'first',
      columns: null,
      price: 0,
      totalPrice: 0,
      totalCount: 0,
      info: {},
      orgId: null, // 卖方id
      goodsId: this.$route.query.goodsId,
      goodsColumnModifyVO: null,
      goodsInfoVO: {
        name: '',
        price: 0,
        detailText: '',
        sysOrg: {
          orgName: '',
          phone: ''
        }
      },
      goodsStockInfoVO: {},
      goodsRelColumn: [],
      showAll: false, // 内存那列表显示全部
      showChoose: false,
      showTypeHoldList: false,
      chooseColorIndex: null,
      swiperOption: {
        loop: false,
        slidesPerView: 5,
        spaceBetween: 10,
        // 设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      isSigleGoods: false, // 是单个商品(没有规格啥的)
      tempImg: tempImages,
      tempImages,
      list: [], // 图片缩小数据
      tableData: [{ color: '白色', amount: 1, type: '32' }], // 已经选择过的商品数据
      goodList: [],
      hasChooseArr: [],
      token: getToken()
    }
  },
  async created() {
    // const { sys_cooperation_model: sysCooperationModel } = await getDictMultiple([
    //   'sys_cooperation_model'
    // ])
    // this.sysCooperationModel = sysCooperationModel
    this.init()
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  watch: {
    goodList: {
      handler(val) {
        this.hasChooseArr = val.filter((item) => {
          return item.amount != 0
        })
        let price = 0
        let count = 0
        this.hasChooseArr.map((ite) => {
          ite.sourceOrderItemFee = ite.price
          ite.orderItemFee = ite.price * ite.amount
          price += ite.price * ite.amount
          count += ite.amount
        })
        this.totalPrice = price
        this.totalCount = count
      },
      deep: true
    }
  },
  methods: {
    async init() {
      this.getDetail(this.goodsId)
    },
    // 需要先登录
    toLogin() {
      if (!this.token) {
        this.$confirm('暂未登录, 是否立刻登录？')
          .then((_) => {
            this.$router.push({
              path: '/login',
              query: { backUrl: 'needMarketDetail', goodsId: this.goodsId }
            })
          })
          .catch((_) => {})
        return false
      }
      return true
    },
    toOrder(data) {
      if (!this.toLogin()) {
        return
      }
      if (this.totalCount == 0) {
        this.$message.warning('请填入商品数量')
        return
      }
      let { goodsId, totalPrice } = this
      this.$router.push({
        path: `/service/goodsOrder`,

        query: {
          dataArr: JSON.stringify(this.hasChooseArr),
          goodsId,
          totalPrice,
          orgId: this.orgId,
          orgName: this.goodsInfoVO.sysOrg.orgName
        }
      })
    },

    changeColor(item, index) {
      this.chooseColorIndex = index
    },
    changePrice(e, item) {
      // this.price = item.price
    },
    changeImg(swiper) {
      let url = swiper.target.currentSrc
      if (!url) return
      this.tempImg = url
    },

    // 获取商品详情
    getDetail(id) {
      getGoodsPreView({ goodsId: id }).then((res) => {
        if (res.code === 200) {
          let { goodsColumnModifyVO, goodsInfoVO, goodsStockInfoVO, minPrice } = res.data
          this.goodsColumnModifyVO = goodsColumnModifyVO
          if (goodsColumnModifyVO.goodsRelColumn) {
            goodsColumnModifyVO.goodsRelColumn.map((item) => {
              if (item.url) {
                var suffix = item.url.match(/[^.]+$/)[0]
                // item.url
                item.urlList = [{ url: item.url, name: `附件.${suffix}` }]
              }
            })
            this.goodsRelColumn = [...goodsColumnModifyVO.goodsRelColumn]
          }

          this.goodsInfoVO = goodsInfoVO
          this.getCaleCatalog(goodsInfoVO.saleCatalogId[0])
          this.tempImg = goodsInfoVO.mainImg
          this.goodsStockInfoVO = goodsStockInfoVO
          this.price = minPrice
          // 单规格
          if (
            goodsStockInfoVO.goodsSku.length == 1 &&
            goodsStockInfoVO.prodAttrStock[0].attrName == '单品'
          ) {
            this.isSigleGoods = true

            let sigleGoodd = {
              ...goodsStockInfoVO.goodsSku[0],
              amount: 0,
              price: goodsStockInfoVO.goodsSku[0].goodsSkuPrice[0].price,
              shopShelvesId: goodsStockInfoVO.shopShelvesId,
              orgId: goodsInfoVO.sysOrg.id,
              goodsImage: goodsInfoVO.mainImg,
              goodsCode: goodsInfoVO.code,
              goodsSkuName: '单品',
              goodsName: goodsInfoVO.name,
              skuAttrValidStrList: [goodsStockInfoVO.goodsSku[0].skuAttrValidStr],
              orderItemFee: goodsStockInfoVO.goodsSku[0].price
            }
            sigleGoodd.map ? delete sigleGoodd.map : null
            sigleGoodd.goodsSku ? delete sigleGoodd.goodsSku : null
            this.orgId = goodsInfoVO.sysOrg.id
            this.goodList = [sigleGoodd]
          } else {
            // 多规格的数据处理
            let multiArr = []
            goodsStockInfoVO.goodsSku.map((item) => {
              let list = item.skuAttrValidStr.split(',')
              let attrNameList = []
              if (list.length) {
                list.map((ite) => {
                  attrNameList.push(ite.split(':')[1])
                })
              }
              let selfItem = {
                ...item,
                price: item.goodsSkuPrice.length ? item.goodsSkuPrice[0].price : 0,
                amount: 0,
                attrNameList,
                shopShelvesId: goodsStockInfoVO.shopShelvesId,
                orgId: goodsInfoVO.sysOrg.id,
                goodsImage: goodsInfoVO.mainImg,
                goodsCode: goodsInfoVO.code,
                goodsSkuName: item.skuAttrValidStr,
                // goodsName: goodsInfoVO.name,
                goodsName: goodsInfoVO.name,
                skuAttrValidStrList: item.skuAttrValidStr.split(','),
                orderItemFee: item.goodsSkuPrice[0].price
              }
              selfItem.map ? delete selfItem.map : null
              selfItem.goodsSku ? delete selfItem.goodsSku : null
              multiArr.push(selfItem)
            })

            this.goodList = [...multiArr]
            // this.price = this.goodList[0].price
            this.orgId = goodsInfoVO.sysOrg.id
          }
        }
      })
    },
    getCaleCatalog(id) {
      saleCatalog(id).then((res) => {
        this.saleCatalogName = res.data.catalogName
      })
    },
    download(item) {
      let url = item.url
      window.location.href = item.url
      // const a = document.createElement('a')
      // a.href = url
      // a.download = '文件' // 下载后文件名
      // a.style.display = 'none'
      // document.body.appendChild(a)
      // a.click() // 点击下载
      // document.body.removeChild(a) // 下载完成移除元素
    },
    // 跳转到一对一客服页
    handlePushKF() {
      if (!this.toLogin()) {
        return
      }
      // let { orgId } = this
      // const { userId } = this.$store.getters.userInfo
      this.$router.push({
        path: `/market/oneOnlineService`,
        query: {
          type: 1,
          orgId: this.goodsInfoVO.sysOrg.id, // 商家组织id
          userId: this.goodsInfoVO.sysOrg.createId, // 商家userId
          custUserName: this.goodsInfoVO.sysOrg.orgName // 商家
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$main-color: #fe9400;
.page {
  background: #fff;
  padding: 20px;
  .goods {
    width: 1150px;
    margin: 0 auto;
  }

  .goods-pic {
    width: 430px;
    // background: red;
    .pic-box {
      width: 400px;
      height: 450px;
      padding: 10px 0px;
    }
    .pic {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    .item-img {
      width: 60px;
      height: 60px;
      box-shadow: 0px 1px 5px #ccc;
    }
  }
  .content {
    margin-top: 20px;
    line-height: 40px;
    .good-name {
      font-size: 20px;
      font-weight: 700;
      color: #000;
      margin-left: 10px;
    }
    .price {
      color: #999;
      font-size: 12px;
      background: #fff3e3;
      padding-left: 10px;
      margin: 0px 0 10px;
      /* color: #606266de; */
    }
    .price-num {
      color: $main-color;
      font-size: 24px;
      font-weight: bolder;
    }
    .price-yuan {
      color: $main-color;
      font-size: 18px;
      margin-left: 40px;
    }

    .goods-btn {
      margin-top: 20px;
      width: 45%;
      height: 50px;
    }
    .buy-btn {
      background: #fe9400;
    }
    .contact-btn {
      color: $main-color;
      border-color: $main-color;
    }
    .label-text {
      font-size: 16px;
      color: #999;
      font-size: 12px;
      margin-left: 10px;
      // font-weight: bold;
      // position: absolute;
      // top: -10px;
    }
    .type {
      position: relative;
      .hide-all {
        overflow: hidden;
        height: 132px;
      }
      .show-all {
        height: 20px;
        width: 100%;
        margin-top: 5px;
        margin-bottom: 15px;
        line-height: 29px;
        text-align: center;
        border-top: 1px solid #ddd;
        cursor: pointer;
      }
      .type-list {
        padding-left: 10px;
        margin-bottom: 5px;
        .attr-list {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          .attr-item {
            flex: 1;
            text-align: center;
          }
          .attr-item2 {
            flex: 1;
            text-align: center;
          }
        }
      }
      .total-content {
        position: relative;
        .total-list {
          position: absolute;
          bottom: 42px;
          z-index: 200;
        }
        .total {
          background: #f2f2f2;
          padding: 0 10px;
          margin-top: 10px;
          .has-choose {
            float: right;
            cursor: pointer;
          }
          .show-choose .el-icon-arrow-down {
            transform: rotate(180deg) !important;
          }
        }
      }
    }
    .btn-list {
      text-align: center;
    }
    .color-img {
      display: inline-block;
      width: 50px;
      height: 50px;
      margin-left: 8px;
      cursor: pointer;
      border: 1px solid #ccc;
    }
    .choose-color {
      border: 1px solid #fe9400;
    }

    .goods-label {
      padding: 10px;
      font-size: 13px;
      color: #606266de;
    }
  }
  .company-info {
    border: 1px solid #ccc;
    margin: 40px 0;
    padding: 10px;
  }
}
.bg-gray {
  background: #f2f2f2;
}
.download {
  display: inline-block;
  color: blue;
  cursor: pointer;
}
.main-color {
  color: #fe9400;
  font-weight: bold;
  font-size: 15px;
}
.swiper-container {
  padding: 3px 40px;
  margin: 10px 0;
}
.swiper-slide {
  cursor: pointer;
}
.swiper-button-prev {
  background-image: url('~@/assets/images/goods/pre.png');
  left: 1px;
}
.swiper-button-next {
  background-image: url('~@/assets/images/goods/next.png');
  right: 1px;
}
.swiper-button-prev,
.swiper-button-next {
  height: 60px;
  background-size: 100% 100%;
  top: 3px;
  margin-top: 0;
  width: 33px;
  box-shadow: 0px 1px 5px #ccc;
}
.file-upload /deep/.el-button {
  display: none !important;
}
</style>
