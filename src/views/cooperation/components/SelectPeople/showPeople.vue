<template>
  <div>
    <div v-if="tagList && tagList.length">
      <el-tag
        v-for="(item, index) in tagList"
        :key="index"
        :closable="type != 3"
        :type="item.receiverType == 0 ? '' : 'danger'"
        @close="handleClose(item, item.type)"
      >
        {{ item.receiverName }}
      </el-tag>
    </div>
    <select-people
      otherTitle="选择部门/承包商"
      ref="selectPeople"
      :value="receiveData.system"
      :multiple="false"
      :showTag="false"
      :disabled="type == 3"
      :showButton="true"
      @onOk="(data) => selectPersonOk(data, 'system')"
    />
  </div>
</template>

<script>
import SelectPeople from './index.vue'

export default {
  components: {
    SelectPeople
  },
  computed: {
    tagList() {
      return this.receiveData && this.getMsgReceiverList(1)
    }
  },
  props: {
    // 选中值
    peopleList: {
      type: [String, Array, Object]
    }
  },
  data() {
    return {
      type: 1,
      receiveData: {
        system: [],
        contractor: [],
        deptSystem: [],
        deptConstructor: []
      },
      tags: []
    }
  },
  methods: {
    // 人员
    selectPersonOk(selectedData, type) {
      if (type === 'system') {
        this.receiveData.system = selectedData
        console.log('selectPersonOk')
        console.log(selectedData)
        this.$emit('update:peopleList', selectedData)
        return
      }
      this.receiveData = { ...this.receiveData, ...selectedData }
      if (!selectedData || !selectedData[0]) return
      this.tags = selectedData
    },
    // 格式化接收者列表 ignoreContractor -> 忽略contractor
    getMsgReceiverList(ignoreContractor) {
      let list = []
      for (let i in this.receiveData) {
        const result = this.receiveData[i].length
          ? this.receiveData[i].map((item) => {
              // eslint-disable-next-line default-case
              switch (i) {
                case 'system':
                  return {
                    receiverId: item.userId,
                    receiverName: item.nickName,
                    receiverType: 0, // 接收者类型：0-用户Id，1-部门Id，2-承包商Id
                    type: 'system'
                  }
                case 'deptSystem':
                  return {
                    receiverId: item.id,
                    receiverName: item.label,
                    receiverType: 1, // 接收者类型：0-用户Id，1-部门Id，2-承包商Id
                    type: 'deptSystem'
                  }
                case 'deptConstructor':
                  return {
                    receiverId: item.id,
                    receiverName: item.cbsdwmc,
                    receiverType: 2, // 接收者类型：0-用户Id，1-部门Id，2-承包商Id
                    type: 'deptConstructor'
                  }
              }
              return null
            })
          : []
        list = [...list, ...result]
      }
      return list
    },
    // 关闭
    handleClose(item, type) {
      const index = this.receiveData[type].findIndex((receiveItem) => {
        // eslint-disable-next-line default-case
        switch (type) {
          case 'system':
            return item.receiverId === receiveItem.userId
          case 'contractor':
            return item.receiverId === receiveItem.contractorOutsiderRefId
          case 'deptSystem':
            return item.receiverId === receiveItem.id
          case 'deptConstructor':
            return item.receiverId === receiveItem.id
        }
        return null
      })
      this.receiveData[type].splice(index, 1)
      this.$emit('update:peopleList', this.receiveData[type])
    }
  },
  watch: {
    peopleList: {
      handler(val) {
        if (val.length === 0) {
          this.receiveData.system = []
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
