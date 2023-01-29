<template>
  <div id="price-stock">
    <div class="header-title">销售模式设置</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="sale-type">
        <el-form-item label="单品/多规格" class="width525">
          <el-radio-group v-model="ruleForm.skuType" @change="changeSkuType" :disabled="isModify">
            <el-radio :label="1">单品</el-radio>
            <el-radio :label="0">多规格</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品规格" v-if="ruleForm.skuType == 0">
          <div
            class="spec"
            v-for="(item, index) in specList"
            :key="index"
            v-show="item.isPlat != 2"
          >
            <div class="mt10 clearfix">
              规格名：
              <input
                v-model="item.name"
                @input="specName(item.name, index)"
                placeholder="请输入规格名"
                :disabled="isModify"
              />
              <i
                class="el-icon-delete del"
                @click="delSpecItem(index, item.name)"
                v-if="!isModify"
              ></i>
            </div>
            <div class="clearfix">
              <div class="input-item">规格值：</div>
              <div
                class="input-item"
                v-for="(valueItem, valueIndex) of item.list"
                :key="valueIndex"
              >
                <input
                  type="text"
                  v-model="valueItem.txt"
                  @input="specValue(valueItem.txt, index, valueIndex)"
                  placeholder="请输入规格值"
                  :disabled="valueItem.oldSku"
                />
                <i
                  @click="delSpec(index, valueIndex, valueItem.txt, item.key)"
                  class="el-icon-circle-close"
                  v-if="!isModify"
                ></i>
              </div>
              <div class="input-item">
                <el-button type="text" @click="addSpec(index)">添加规格值</el-button>
              </div>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="addSpecItem" :disabled="isModify"
              >添加规格项目</el-button
            >
            <span class="spec-tip" style="color: #afb3ba"
              >如有颜色、尺码等多种规格，请添加商品规格</span
            >
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-table :data="ruleForm.tableData" border style="width: 100%" class="spec-table">
        <el-table-column
          v-for="(item, index) in tableTh"
          :key="index"
          :prop="item.txt"
          :label="item.label"
        >
          <template slot-scope="scope">
            <div v-if="tableTh[index].txt == 'skuImg'">
              <ty-upload
                v-model="scope.row[tableTh[index].txt]"
                action="/file/file/upload"
                :isShow="true"
                :isAvatar="true"
                :width="50"
                :height="50"
                :length="1"
                :multiple="false"
                resFormat="data"
              >
              </ty-upload>
              <!-- <div class="avatar-uploader spec-upload" v-if="!imgSpecFlag">
                <img
                  v-if="scope.row[tableTh[index].txt]"
                  :src="scope.row[tableTh[index].txt]"
                  class="avatar1"
                />
                <i v-else class="el-icon-plus avatar1-uploader-icon el-upload"></i>
              </div>
              <div @click="specImg(scope.$index)" v-else>
                <el-upload
                  class="avatar-uploader spec-upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :before-upload="catalogImg"
                >
                  <img
                    v-if="scope.row[tableTh[index].txt]"
                    :src="scope.row[tableTh[index].txt]"
                    class="avatar1"
                  />
                  <i v-else class="el-icon-plus avatar1-uploader-icon"></i>
                </el-upload>
              </div> -->
            </div>
            <div v-else>
              <div v-if="tableTh[index].flag">
                <el-input
                  type="number"
                  :min="0"
                  v-model="scope.row[tableTh[index].txt]"
                  class="text-input"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div v-else>
                {{ scope.row[tableTh[index].txt] }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="time-btn">
      <el-button type="primary" @click="submit(1)">保存</el-button>
    </div>
  </div>
</template>
<script>
import { SALE_ACCOUNT_TYPE_ID, ACCOUNT_NAME } from '@/constants'
import { SHOP_SHELVES_ID } from '@/utils/dict-enum'
import { modifyStock, getStock } from '@/api/goodsCenter/serviceMarket'
import { getDictMultiple } from '@/utils/tool'

export default {
  data() {
    return {
      unitOptions: [], // 销售单位
      unitId: '', // 销售单位ID
      dateList: [],
      dateArr: [],
      checkDateList: [], // 已选的日期列表
      currentMonth: '', // 当前月份
      selectMonth: '', // 选择月份
      currentId: 0,
      checkedList: [],
      ruleForm: {
        tableData: [],
        saleType: 1, // 销售模式:1普通，2日期，3酒店
        appointmentDate: null, // 提前预定天数
        skuType: 1, // 单品/多规格
        peopleType: [] // 已选的人群类型
      },
      rules: {},
      specList: [], // 存放规格组
      tableTh: [],
      attrName: [], // 规格名
      prodAttrValue: [], // 规格值
      prodAttrValue1: [], // 拼好规格值
      prodAttrValue2: [],
      imgSpecFlag: true, // 用于标志图片上传，防止过快点击上传到错误序号
      uploadImgSpecIndex: 0, // 规格属性序号
      modeList: [], // 账目类型
      unitTxt: '',
      shopShelvesId: SHOP_SHELVES_ID.TOB, // 货架ID
      isModify: false, // 是否是修改规格
      goodsId: this.$route.query.goodsId
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { goods_unit: goodsUnit, sale_account_type: saleAccountType } = await getDictMultiple([
        'goods_unit',
        'sale_account_type'
      ])
      this.modeList = saleAccountType
      this.unitOptions = goodsUnit
      await this.getStockInfo(this.goodsId, this.shopShelvesId)
      if (!this.isModify) {
        if (this.ruleForm.skuType == 1) {
          this.specList = [
            {
              name: '单品',
              isPlat: 0,
              key: Date.now(),
              list: [
                {
                  txt: '单品'
                }
              ]
            }
          ]
          this.specShow()
        }
      }
    },
    // 判断是否重复值
    isRepeat(arr, value) {
      let attrHash = {}
      for (let i in arr) {
        if (value ? attrHash[arr[i][value]] : attrHash[arr[i]]) {
          return true
        }
        value ? (attrHash[arr[i][value]] = true) : (attrHash[arr[i]] = true)
      }
    },
    submit() {
      let prodAttrStock = []
      let attrFlag = this.isRepeat(this.attrName, 'name')
      if (attrFlag) {
        this.messageErr('不能有重复的规格名')
        return
      }
      for (let i in this.prodAttrValue2) {
        let prodFlag = this.isRepeat(this.prodAttrValue2[i])
        if (prodFlag) {
          this.messageErr('一个规格名不能有重复的规格值')
          return
        }
      }
      if (this.attrName.length == 1) {
        let obj = {
          attrName: this.attrName[0].name,
          prodAttrValue: this.prodAttrValue,
          isPlat: this.attrName[0].isPlat
        }
        // if (this.isModify && this.ruleForm.saleType == 1) {
        //   obj.prodAttrId = this.attrName[0].key
        // }
        prodAttrStock.push(obj)
      } else {
        for (let i in this.attrName) {
          let obj = {
            attrName: this.attrName[i].name,
            prodAttrValue: this.prodAttrValue2[i],
            isPlat: this.attrName[i].isPlat
          }
          // if (this.isModify && this.ruleForm.saleType == 1) {
          //   obj.prodAttrId = this.attrName[i].key
          // }
          prodAttrStock.push(obj)
        }
      }
      let goodsSku = []
      // 销售方式为普通时，不保存日历
      if (this.ruleForm.saleType == 1) {
        if (!this.verifySku()) {
          return
        }
        let composeSku = this.composeSku()
        if (!composeSku) {
          return
        }
        goodsSku = composeSku
      }
      let flag = true
      for (let prodAttr of prodAttrStock) {
        if (prodAttr.isPlat == 0) {
          flag = false
        }
      }
      if (flag) {
        this.messageErr('至少设置一个规格')
        return
      }
      for (let sku of goodsSku) {
        if (sku.goodsSkuPrice.length == 0) {
          this.messageErr('至少设置一天的价格库存')
          return
        }
      }
      let skuObj = {
        goodsId: this.goodsId,
        goodsSku,
        prodAttrStock,
        shopShelvesId: this.shopShelvesId
      }
      // let apiName = this.isModify?goodsManage.modifyStock:goodsManage.addStock;
      this.$confirm(
        '修改规格的数据将对商品原有的规格的数据都删除，如涉及到产品库存数量请到仓库中心的调整产品的功能进行数据处理并确认处理！',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          modifyStock(skuObj).then((res) => {
            this.$message.success('商品规格新增成功!')
            this.$router.go(-1)
          })
        })
        .catch(() => {})
    },
    // 查询价格库存功能
    async getStockInfo(goodsId, shopShelvesId) {
      if (!goodsId) {
        return
      }
      let res = await getStock({
        goodsId,
        shopShelvesId
      })
      let data = res.data
      if (data.prodAttrStock.length > 0) {
        this.isModify = true
        this.ruleForm.saleType = data.saleType
        this.ruleForm.skuType = data.isThirdSku
        this.unitId = `${data.unitId}`
        // 赋值规格名
        let specList = []
        for (let i of data.prodAttrStock) {
          let _list = []
          for (let k of i.prodAttrValue) {
            _list.push({
              txt: k
            })
          }
          specList.push({
            name: i.attrName,
            key: i.prodAttrId,
            list: _list,
            isPlat: i.isPlat
          })
        }
        this.specList = specList
        this.specShow1(data.goodsSku)
      }
    },
    // 普通模式编辑用的
    specShow1(datas) {
      this.specShow()
      datas.map((item) => {
        let list = item.skuAttrValidStr.split(',')
        for (let j in list) {
          let idx = list[j].indexOf(':')
          let str = list[j].substring(idx + 1)
          if (this.specList[j] != undefined) {
            item[this.specList[j].key] = str
          }
        }
        for (let j in item.goodsSkuPrice) {
          let item1 = item.goodsSkuPrice[j]
          item[item1.saleAccountTypeId] = item.goodsSkuPrice[j].price
        }
        // item.price=item.price;
        // item.stockNum=item.stockNum;
      })
      this.ruleForm.tableData = datas
      // this.showPriceStock();
    },
    // 验证规格名/规格值是否至少有一个
    verifySku() {
      if (this.specList.length == 0) {
        this.messageErr('至少输入一个规格')
        return false
      }
      if (this.specList.length > 0) {
        if (this.specList.length == 1 && this.specList[0].isPlat == 2) {
          this.messageErr('至少输入一个规格')
          return false
        }
        let flag = true
        this.specList.map((item) => {
          if (item.isPlat != 2 && item.list.length > 0) {
            item.list.map((item0) => {
              if (item0.txt != '') {
                flag = false
              }
            })
          }
        })
        if (flag) {
          this.messageErr('至少输入一个规格值')
          return false
        }
      }
      return true
    },
    // 重置功能
    resetSkuInfo() {
      this.ruleForm.tableData.forEach((item) => {
        item.stockNum = ''
        for (let i in item) {
          for (let j of this.modeList) {
            if (i == j[SALE_ACCOUNT_TYPE_ID]) {
              item[i] = ''
            }
          }
        }
      })
    },
    // 把规格值和规格名组合成完成的SKU
    composeSku() {
      let goodsSku = []
      let tableData = this.ruleForm.tableData
      for (let i in tableData) {
        let obj = {}
        let skuAttrValidStr = ''
        if (this.attrName.length == 1) {
          // // console.log(this.attrName)
          skuAttrValidStr = `${this.attrName[0].name}:${this.prodAttrValue[i]}`
        } else {
          /// / console.log(this.attrName)
          for (let j in this.prodAttrValue1[i]) {
            skuAttrValidStr = `${skuAttrValidStr + this.attrName[j].name}:${
              this.prodAttrValue1[i][j]
            },`
          }
        }
        // 去掉逗号
        if (skuAttrValidStr.substr(skuAttrValidStr.length - 1, skuAttrValidStr.length) == ',') {
          skuAttrValidStr = skuAttrValidStr.substr(0, skuAttrValidStr.length - 1)
        }
        let goodsSkuPrice = []
        let stockNum = []
        for (let j of this.modeList) {
          if (
            tableData[i][j[SALE_ACCOUNT_TYPE_ID]] == '' ||
            tableData[i][j[SALE_ACCOUNT_TYPE_ID]] == null
          ) {
            this.messageErr('规格明细各项收费不能为空')
            return false
          }
          if (tableData[i].stockNum == '') {
            this.messageErr('库存不为空')
            return false
          }
          goodsSkuPrice.push({
            price: tableData[i][j[SALE_ACCOUNT_TYPE_ID]],
            saleAccountTypeId: j[SALE_ACCOUNT_TYPE_ID]
          })
        }
        if (tableData[i].stockNum == '') {
          this.messageErr('库存不为空')
          return false
        }
        obj = {
          goodsSkuPrice,
          skuAttrValidStr,
          stockNum: tableData[i].stockNum
        }
        if (this.ruleForm.saleType == 1) {
          obj.stockNum = [
            {
              stockNum: tableData[i].stockNum
            }
          ]
        } else {
          obj.stockNum = tableData[i].stockNum
        }
        goodsSku.push(obj)
      }
      return goodsSku
    },
    // 选择规格类型：单品/多规格
    changeSkuType() {
      this.specList = []
      if (this.ruleForm.skuType == 1) {
        this.specList = [
          {
            name: '单品',
            isPlat: 0,
            key: Date.now(),
            list: [
              {
                txt: '单品'
              }
            ]
          }
        ]
      }
      this.specShow()
    },
    // 切换销售模式
    changeSaleType() {
      this.specList.map((item, idx) => {
        if (item.isPlat == 2) {
          this.specList.splice(idx, 1)
        }
      })
      this.specShow()
    },
    // 判断规格名是否相同
    specName(e, index) {
      let n = 0
      for (let i of this.specList) {
        if (i.name == e) {
          n++
        }
      }
      this.specShow()
    },
    // 判断规格值是否相同
    specValue(e, index, valueIndex) {
      let n = 0
      for (let i of this.specList[index].list) {
        if (i.txt == e) {
          n++
        }
      }
      if (this.specList[index].list[valueIndex].txt != '') {
        this.specShow()
      }
    },
    // 添加规格项目
    addSpecItem() {
      this.specList.push({
        name: '',
        isPlat: 0,
        key: Date.now(),
        list: []
      })
    },
    // 删除规格项目
    delSpecItem(e, name) {
      this.specList.splice(e, 1)
      this.specShow(0)
    },
    // 添加规格值
    addSpec(e) {
      this.specList[e].list.push({
        txt: ''
      })
      // this.columnFlag = e;
    },
    // 删除属性值
    delSpec(index, valueIndex, value, key) {
      let arry = []
      this.specList[index].list.splice(valueIndex, 1)
      this.ruleForm.tableData.forEach((item, idx) => {
        if (item[key] != value) {
          arry.push(item)
        }
      })
      this.ruleForm.tableData = arry
      this.specShow(0)
    },
    specImg(e) {
      this.uploadImgSpecIndex = e
    },
    lastStep() {
      this.$emit('lastStep')
    },
    // 处理表格与表头数据
    specShow(statu) {
      let [list, list1, list2] = [[], [], []]
      if (Object.prototype.toString.call(this.specList) != '[object Array]') {
        // 不是数组
        return
      }
      for (let i of this.specList) {
        if (i.name != '') {
          let _list = []
          for (let j in i.list) {
            if (i.list[j].txt != '') {
              _list.push(i.list[j].txt)
            }
          }
          if (_list.length > 0) {
            list.push(_list)
            list1.push({ key: i.key, name: i.name, isPlat: i.isPlat })
          }
        }
      }
      let len = this.ruleForm.tableData.length
      if (list.length == 0) {
        this.ruleForm.tableData = []
      } else if (list.length == 1) {
        list[0].forEach((item, idx) => {
          let obj = {}
          obj[list1[0].key] = item
          this.modeList.forEach((item1) => {
            if (this.ruleForm.tableData.length > 0) {
              if (idx < len) {
                if (this.ruleForm.tableData[idx][item1[SALE_ACCOUNT_TYPE_ID]]) {
                  obj[item1[SALE_ACCOUNT_TYPE_ID]] =
                    this.ruleForm.tableData[idx][item1[SALE_ACCOUNT_TYPE_ID]]
                } else {
                  obj[item1[SALE_ACCOUNT_TYPE_ID]] = ''
                }
              } else {
                obj[item1[SALE_ACCOUNT_TYPE_ID]] = ''
              }
            } else {
              obj[item1[SALE_ACCOUNT_TYPE_ID]] = ''
            }
          })
          if (this.ruleForm.tableData.length > 0 && idx < len) {
            obj.stockNum = this.ruleForm.tableData[idx].stockNum
            obj.skuImg = this.ruleForm.tableData[idx].skuImg
            obj.goodsSkuId = this.ruleForm.tableData[idx].goodsSkuId
          } else {
            obj.stockNum = ''
            obj.skuImg = ''
            obj.goodsSkuId = ''
          }
          list2.push(obj)
        })

        this.prodAttrValue = list[0]
      } else {
        let specTabal = this.testArray(list)
        this.prodAttrValue1 = specTabal
        let lastLen = list[list.length - 1].length
        specTabal.forEach((item, idx) => {
          let obj = {}
          item.forEach((item1, idx1) => {
            obj[list1[idx1].key] = item1
          })
          if (statu == undefined) {
            if (list[list.length - 1].length == 0) {
              return
            }
            if (this.columnFlag == list.length - 1) {
              this.modeList.forEach((item2) => {
                if (this.ruleForm.tableData.length > 0) {
                  if (this.ruleForm.tableData.length != specTabal.length) {
                    if ((idx + 1) % lastLen != 0) {
                      if (parseInt(idx / lastLen) == 0) {
                        obj[item2[SALE_ACCOUNT_TYPE_ID]] =
                          this.ruleForm.tableData[idx][item2[SALE_ACCOUNT_TYPE_ID]]
                      } else {
                        let index = idx - parseInt(idx / lastLen)
                        /// / console.log(this.ruleForm.tableData[index])
                        obj[item2[SALE_ACCOUNT_TYPE_ID]] =
                          this.ruleForm.tableData[index][item2[SALE_ACCOUNT_TYPE_ID]]
                      }
                    } else {
                      obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
                    }
                  } else {
                    obj[item2[SALE_ACCOUNT_TYPE_ID]] =
                      this.ruleForm.tableData[idx][item2[SALE_ACCOUNT_TYPE_ID]]
                  }
                } else {
                  obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
                }
              })
              if (this.ruleForm.tableData.length > 0) {
                if (this.ruleForm.tableData.length != specTabal.length) {
                  if ((idx + 1) % lastLen != 0) {
                    if (parseInt(idx / lastLen) == 0) {
                      obj.stockNum = this.ruleForm.tableData[idx].stockNum
                      obj.skuImg = this.ruleForm.tableData[idx].skuImg
                      obj.goodsSkuId = this.ruleForm.tableData[idx].goodsSkuId
                    } else {
                      let index = idx - parseInt(idx / lastLen)
                      obj.stockNum = this.ruleForm.tableData[index].stockNum
                      obj.skuImg = this.ruleForm.tableData[index].skuImg
                      obj.goodsSkuId = this.ruleForm.tableData[index].goodsSkuId
                    }
                  } else {
                    obj.stockNum = ''
                    obj.skuImg = ''
                    obj.goodsSkuId = ''
                  }
                } else {
                  obj.stockNum = this.ruleForm.tableData[idx].stockNum
                  obj.skuImg = this.ruleForm.tableData[idx].skuImg
                  obj.goodsSkuId = this.ruleForm.tableData[idx].goodsSkuId
                }
              } else {
                obj.stockNum = ''
                obj.skuImg = ''
                obj.goodsSkuId = ''
              }
            } else {
              this.modeList.forEach((item2) => {
                if (this.ruleForm.tableData.length > 0) {
                  if (idx < len) {
                    if (this.ruleForm.tableData[idx][item2[SALE_ACCOUNT_TYPE_ID]]) {
                      obj[item2[SALE_ACCOUNT_TYPE_ID]] =
                        this.ruleForm.tableData[idx][item2[SALE_ACCOUNT_TYPE_ID]]
                    } else {
                      obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
                    }
                  } else {
                    obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
                  }
                } else {
                  obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
                }
              })
              if (this.ruleForm.tableData.length > 0 && idx < len) {
                obj.stockNum = this.ruleForm.tableData[idx].stockNum
                obj.skuImg = this.ruleForm.tableData[idx].skuImg
                obj.goodsSkuId = this.ruleForm.tableData[idx].goodsSkuId
              } else {
                obj.stockNum = ''
                obj.skuImg = ''
                obj.goodsSkuId = ''
              }
            }
          } else if (statu == 0) {
            this.modeList.forEach((item2) => {
              if (this.ruleForm.tableData.length > 0) {
                if (idx < len) {
                  if (this.ruleForm.tableData[idx][item2[SALE_ACCOUNT_TYPE_ID]]) {
                    obj[item2[SALE_ACCOUNT_TYPE_ID]] =
                      this.ruleForm.tableData[idx][item2[SALE_ACCOUNT_TYPE_ID]]
                  } else {
                    obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
                  }
                } else {
                  obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
                }
              } else {
                obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
              }
            })
            if (this.ruleForm.tableData.length > 0) {
              // console.log(this.ruleForm.tableData[idx])
              obj.stockNum = this.ruleForm.tableData[idx].stockNum
              obj.skuImg = this.ruleForm.tableData[idx].skuImg
              obj.goodsSkuId = this.ruleForm.tableData[idx].goodsSkuId
            } else {
              obj.stockNum = ''
              // obj.skuImg = '';
              obj.goodsSkuId = ''
            }
          } else {
            this.modeList.forEach((item2) => {
              if (this.ruleForm.tableData.length > 0) {
                if (idx < len) {
                  if (this.ruleForm.tableData[idx][item2[SALE_ACCOUNT_TYPE_ID]]) {
                    obj[item2[SALE_ACCOUNT_TYPE_ID]] =
                      this.ruleForm.tableData[idx][item2[SALE_ACCOUNT_TYPE_ID]]
                  } else {
                    obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
                  }
                } else {
                  obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
                }
              } else {
                obj[item2[SALE_ACCOUNT_TYPE_ID]] = ''
              }
            })
            if (this.ruleForm.tableData.length > 0 && idx < len) {
              // console.log(this.ruleForm.tableData[idx])
              obj.stockNum = this.ruleForm.tableData[idx].stockNum
              obj.skuImg = this.ruleForm.tableData[idx].skuImg
              obj.goodsSkuId = this.ruleForm.tableData[idx].goodsSkuId
            } else {
              obj.stockNum = ''
              // obj.skuImg = '';
              obj.goodsSkuId = ''
            }
          }
          list2.push(obj)
        })
      }
      // 加表头
      let tableTh = []
      list1.map((item) => {
        let objTh = {
          txt: item.key.toString(),
          label: item.name,
          type: 'text'
        }
        tableTh.push(objTh)
      })
      this.modeList.map((item) => {
        tableTh.push({
          txt: item[SALE_ACCOUNT_TYPE_ID],
          label: item.accountName,
          flag: true,
          type: 'input'
        })
      })
      tableTh.push(
        { txt: 'stockNum', label: '库存', flag: true, type: 'input' },
        { txt: 'skuImg', label: '规格图片', type: 'upImg' }
      )
      this.ruleForm.tableData = list2
      this.tableTh = tableTh
      this.attrName = list1
      this.prodAttrValue2 = list
    },
    testArray(array) {
      if (Object.prototype.toString.call(array) != '[object Array]') {
        // 不是数组
        return
      }
      // 是不是二维码数组
      for (let i in array) {
        if (Object.prototype.toString.call(array[i]) != '[object Array]') {
          // 不是二维数组
          return
        }
      }
      // 如果长度是0
      if (array.length == 0) {
        return
      }
      // 如果长度是1
      if (array.length == 1) {
        let list = []
        for (let i of array[0]) {
          list.push(i)
        }
        return list
      }
      // 将数组下标0和1组合成新的二维数组
      let newArray = []
      let array0 = array[0]
      let array1 = array[1]
      for (let i in array0) {
        for (let j in array1) {
          newArray.push([array0[i], array1[j]])
        }
      }
      // 如果长度是2
      if (array.length == 2) {
        return newArray
      }
      // 如果长度是大于2
      // for循环array
      /// / console.log(newArray);
      for (let i = 2; i < array.length; i++) {
        let list = array[i]
        // 临时数组
        let _array = []
        // 遍历新的数组
        for (let k in newArray) {
          // 遍历目标数组
          for (let j in array[i]) {
            // 拷贝数组并添加到_array
            _array.push(newArray[k].concat(array[i][j]))
          }
        }
        newArray = _array
      }
      /// / console.log(newArray);
      return newArray
    }
  }
}
</script>
<style lang="scss" scoped>
.sale-type {
  min-width: 420px;
}
.demo-ruleForm {
  @include faj(flex-start, flex-start);
  .order-travelers {
    color: #606266;
    padding: 0 0 20px 20px;
  }
  .travelers-info {
    margin-left: 10px;
    border-left: 1px solid #ccc;
  }
}
.header-title {
  padding: 10px;
  margin-bottom: 18px;
  font-size: 14px;
  background: #e6e9ed;
}
.time-btn {
  margin-top: 10px;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
}
.avatar1-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar1 {
  width: 50px;
  height: 50px;
}
.mt10 {
  margin-bottom: 10px;
}
.display-block {
  display: block;
}
.display-inline {
  display: inline !important;
}
.clearfix {
  *zoom: 1;
}
.clearfix:before,
.clearfix:after {
  display: block;
  line-height: 0;
  content: '';
}
.clearfix:after {
  clear: both;
}
.spec {
  max-width: 420px;
  padding: 10px;
  margin-bottom: 18px;
  border: 1px solid #dcdfe6;
  font-size: 14px;
  color: #606266;
  .input-item {
    position: relative;
    float: left;
    margin: 0 10px 10px 0;
    i {
      position: absolute;
      top: -10px;
      right: -8px;
      font-size: 20px;
    }
  }
  input {
    width: 130px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
  .del {
    float: right;
    font-size: 20px;
    cursor: pointer;
  }
}
.mar0 {
  margin-bottom: 0;
}
.spec-tip {
  font-size: 14px;
  color: #afb3ba;
}
.spec-table {
  input {
    width: 98%;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
}
.date-price {
  @include faj(flex-start, space-between);
  .set-price {
    border: 1px solid #dcdfe6;
    margin-left: 20px;
    min-width: 0;
    flex: 1;
    padding-bottom: 20px;
  }
}
.date-content {
  margin-bottom: 20px;
  min-width: 560px;
  width: 40%;
  .date-head {
    @include faj(center, space-between);
    margin-bottom: 10px;
    .arrow-font {
      font-size: 26px;
    }
  }
  .date-btn {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .btn-label {
      border: 1px solid #dcdfe6;
      padding: 0 20px;
      margin-right: 10px;
    }
  }
  .time-content {
    display: flex;
    flex-flow: wrap;
    border-left: 1px solid #dcdfe6;
    .time-item {
      background-color: #f1f1f1;
      width: 14.2%;
      padding: 7px 0;
      border-bottom: 1px solid #dcdfe6;
      border-top: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      text-align: center;
    }
    .weekend-item {
      background-color: #eef5fe;
    }
  }
  .day-content {
    display: flex;
    flex-flow: wrap;
    border-left: 1px solid #dcdfe6;
    .set-status {
      padding-top: 14px;
      .el-button--mini {
        padding: 4px 6px;
      }
      p {
        padding-bottom: 14px;
      }
    }
    .el-checkbox-button {
      margin-right: 0;
      width: 14.05%;
      height: 99px;
      border-right: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
    }
    .day-item {
      // padding: 5px;
      width: 14.2%;
      height: 100px;
      border-bottom: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      .item-txt {
        color: #409eff;
        text-align: center;
      }
      .day-del-btn {
        background-color: #409eff;
        color: #fff;
        text-align: center;
        margin-left: 50px;
        line-height: 25px;
        font-size: 12px;
      }
    }
    .un-active {
      background-color: #f1f1f1;
      color: #ccc;
      .item-txt {
        color: #ccc;
      }
    }
  }
}
</style>
<style lang="scss">
#price-stock {
  .el-input {
    // width: 120px;
  }
  .el-input__inner {
    // width: 120px !important;
    // width: 160px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
  }
  .el-checkbox-button__inner {
    border: none;
    width: 100%;
    height: 99px;
  }
  .un-active {
    .el-checkbox-button__inner {
      background-color: #f1f1f1;
    }
  }
  .date-head {
    .el-input {
      width: 180px;
    }
    .el-input__inner {
      width: 180px !important;
    }
  }
  .sale-type {
    .el-input {
      width: 160px;
    }
    .el-input__inner {
      width: 160px !important;
    }
  }
}
</style>
