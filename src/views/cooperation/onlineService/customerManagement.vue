<template>
  <div>
    <!-- 页面列表 -->
    <ty-table2 :tableId="tableId" ref="kfTable"> </ty-table2>
    <!-- 客服操作 -->
    <ty-form-dialog :formDialog="formKfUser" ref="formKfUser"> </ty-form-dialog>
    <!-- 选择用户 -->
    <ty-table-dialog2 class="table-dialog" :tableDialog="tableDialog" ref="tableDialog">
    </ty-table-dialog2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 页面列表
      tableId: '741327666803773440', // 列表ID
      formKfUser: {
        title: '添加客服', // 对话框标题
        visible: false, // 对话框是否可见
        formId: '741333780765216768',
        width: 500, // 对话框宽度
        reset: false, // 是否重置表单
        labelWidth: 80, // 表单域标签的宽度
        data: [],
        btns: [
          {
            // 表单按钮
            text: '确定', // 按钮名称
            class: '', // 按钮样式
            emit: (e) => {
              // 按钮事件
              this.sureKfOrgRelUser(e)
            },
            type: 'submit'
          },
          {
            // 表单按钮
            text: '取消', // 按钮名称
            class: '', // 按钮样式
            emit: (e) => {
              // 按钮事件
              this.formKfUser.visible = false
            }
          }
        ]
      },
      // 弹出框列表
      tableDialog: {
        title: '企业用户', // 弹出框标题
        visible: false, // 弹出框是否可见
        width: 600, // 弹出框宽度
        tableId: '741325126359977984' // 列表ID
      },
      selectUser: {}, // 选中的员工
      kfOrgRelUserFlag: 0 // 区分删除、修改  客服只有删除、修改
    }
  },
  methods: {
    // 获取企业Id
    getOrgId() {
      return window.sessionStorage.getItem('orgId')
    },
    // 添加客服
    addKfOrgRelUser() {
      this.$refs.formKfUser.reset()
      this.formKfUser.visible = true
      this.kfOrgRelUserFlag = 1
    },
    // 修改客服
    modifyKfOrgRelUser(e) {
      console.log(e.orgRelUserId)
      let obj = {
        realName: e.realName,
        kfHeadImage: e.kfHeadImage,
        kfName: e.kfName
      }
      this.$refs.formKfUser.echoData(obj)
      this.formKfUser.visible = true
      this.kfOrgRelUserFlag = 2
      this.selectUser.orgRelUserId = e.orgRelUserId
    },
    // 删除客服
    delKfOrgRelUser(e) {
      console.log(e)
      this.kfOrgRelUserFlag = 0
      this.selectUser.orgRelUserId = e.orgRelUserId
      this.sureKfOrgRelUser({
        kfHeadImage: e.kfHeadImage,
        kfName: e.kfName,
        realName: e.realName
      })
    },
    // 确定客服
    sureKfOrgRelUser(e) {
      console.log(e)
      let obj = {
        ...e,
        isKf: this.kfOrgRelUserFlag == 0 ? 0 : 1,
        orgId: this.getOrgId(),
        orgRelUserId: this.selectUser.orgRelUserId
      }
      this.api.modifyKfOrgRelUser(obj, () => {
        let str =
          this.kfOrgRelUserFlag == 0
            ? '删除成功！'
            : this.kfOrgRelUserFlag == 1
            ? '新增成功！'
            : '修改成功！'
        this.$refs.kfTable.operateSearch(str)
        this.formKfUser.visible = false
      })
    },
    // 选择用户
    getUser() {
      // 每次都刷新列表
      if (this.$refs.tableDialog.$refs.tyTable) this.$refs.tableDialog.$refs.tyTable.searchEvent()
      this.tableDialog.visible = true
    },
    // 确定选中用户
    sureUser(e) {
      if (e.length != 1) {
        this.messageErr('请选择一个员工！')
        return
      }
      this.tableDialog.visible = false
      let obj = {
        realName: e[0].realName,
        kfHeadImage: e[0].headImageSrc,
        kfName: e[0].realName
      }
      this.$refs.formKfUser.echoData(obj)
      this.selectUser = e[0]
      this.$refs.formKfUser.reset()
    }
  }
}
</script>
<style lang="scss" scoped></style>
