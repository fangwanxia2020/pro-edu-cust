<template>
  <ty-dialog
    :show.sync="newVisible"
    :appendToBody="true"
    :title="topTitle"
    :onOk="submitReason"
    width="30%"
  >
    <div class="mid-qr">
      <div id="printTest" style="text-align: center; padding-top: 20px">
        <div style="width: 330px; margin: auto">{{ infoTitle }}</div>
        <div class="img" ref="qrCodeUrl">
          <img :src="QrcodeImg" alt="" style="margin: 35px auto; width: 270px; height: 270px" />
        </div>
      </div>
      <div>
        <span v-print="'#printTest'" class="point">点击打印</span>
        <span class="point" @click="printOut('printTest')">点击下载</span>
      </div>
    </div>
  </ty-dialog>
</template>

<script>
import html2Canvas from 'html2canvas'
import QR from '@/utils/ty-qrcode.js'

export default {
  name: 'QRcode',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    topTitle: {
      type: String,
      default: ''
    },
    infoTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      QrcodeImg: null,
      newVisible: false
    }
  },
  created() {
    this.addCode()
  },
  watch: {
    // 不能直接修改:show.sync 中props的值所以要定义多一个变量
    visible(val) {
      this.newVisible = val
    },
    // 弹出窗组件显示隐藏状态发生改变要同步触发父级元素的修改
    newVisible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    addCode() {
      // let val = "http://sc-test.tianyuaninternet.com/hplatform-h5/";
      let val = this.url
      this.addCodeImg(val)
    },
    addCodeImg(val) {
      let img = QR.createQrCodeImg(val, {
        errorCorrectLevel: 'L'
      })
      // console.log(img);
      this.QrcodeImg = img
    },
    // 关闭二维码弹窗
    submitReason() {
      this.newVisible = false
      // this.$emit("update:visible", false);
    },
    // 导出图片
    dataURLToBlob(dataurl) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    // name 为div的id 名称，会把id 下面的所有标签渲染出的页面效果导出
    downloadResult(name) {
      // let canvasID = document.body;
      let canvasID = document.getElementById(name)
      console.log('canvasID')
      console.log(canvasID)
      let a = document.createElement('a')
      html2Canvas(canvasID).then((canvas) => {
        let dom = document.body.appendChild(canvas)
        dom.style.display = 'none'
        a.style.display = 'none'
        document.body.removeChild(dom)
        let blob = this.dataURLToBlob(dom.toDataURL('image/png'))
        a.setAttribute('href', URL.createObjectURL(blob))
        a.setAttribute('download', `${this.infoTitle}.png`)
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(blob)
        document.body.removeChild(a)
      })
    },
    printOut(name) {
      console.log('printOut')
      this.$message.success('下载成功, 请稍等片刻')
      // 滚动条置顶，
      // $(window).scrollTop(0);
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.downloadResult(name)
      console.log('printOut2')
    }
  }
}
</script>

<style lang="scss" scoped>
// 图片打印媒体查询
@media print {
  @page {
    size: auto;
    margin: 3mm;
  }
}
.el-input {
  width: 45%;
}

.mid-qr {
  text-align: center;
  font-size: 19px;
  color: #0075f5;

  .point {
    cursor: pointer;
    margin: 20px;
  }
}
</style>
