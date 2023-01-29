<template>
  <!-- 密码输入框 -->
  <div class="am_payPwd" :id="`ids_${id}`">
    <input type="password" name="password" style="display: none" />
    <input
      type="password"
      maxlength="1"
      @input="changeInput"
      @click="changePwd"
      v-model="pwdList[i]"
      @keyup="keyUp($event)"
      @keydown="oldPwdList = pwdList.length"
      class="shortInput"
      v-for="(v, i) in max"
      :key="i"
    />
  </div>
</template>

<script>
export default {
  props: {
    // 当一个页面有多个密码输入框时，用id来区分
    id: {
      type: [String, Number],
      default: 1
    },
    max: {
      type: [Number, String],
      default: 6
    }
  },
  data() {
    return {
      pwdList: [],
      oldPwdList: [],
      isDelete: false,
      ipt: ''
    }
  },
  mounted() {
    this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`)
  },
  methods: {
    keyUp(ev) {
      let index = this.pwdList.length
      if (!index) return
      if (ev.keyCode === 8) {
        this.isDelete = true
        if (this.oldPwdList === this.pwdList.length) {
          if (index === this.pwdList.length) {
            this.pwdList.pop()
          }
          index--
        } else {
          index > 0 && index--
        }
        this.ipt[index].focus()
      } else if (this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
        this.isDelete = false
        this.pwdList.pop()
        this.pwdList.push(ev.key)
        this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
      }
      this.$emit('get', this.pwdList.join(''))
    },
    changePwd() {
      let index = this.pwdList.length
      index === 6 && index--
      this.ipt[index].focus()
    },
    changeInput() {
      let index = this.pwdList.length
      let val = this.pwdList[index - 1]
      if (!/[0-9]/.test(val)) {
        this.pwdList.pop()
        return
      }
      if (!val) {
        this.pwdList.pop()
        index--
        if (index > 0) this.ipt[index - 1].focus()
      } else if (index < 6) this.ipt[index].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.am_payPwd {
  display: inline-block;
  width: 240px;
  height: 40px;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 10px 0;
  position: relative;
  margin-left: 1px;
  @include faj(center, space-around);
  .shortInput {
    text-align: center;
    font-size: 20px;
    float: left;
    width: 16%;
    height: 20px;
    color: #333;
    outline: #ff0067;
    &:not(:last-child) {
      border-right: 1px solid #999;
    }
  }
}
</style>
