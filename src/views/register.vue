<template>
  <div id="register">
    <el-container>
      <el-main>
        <el-form
          v-if="!hasRegister"
          class="info-form"
          :model="messageForm"
          :rules="rules"
          ref="messageForm"
          label-width="100px"
        >
          <div class="title">欢迎注册{{ title }}账号</div>
          <el-form-item label="手机号码" prop="phoneNum">
            <el-input
              v-model="messageForm.phoneNum"
              prefix-icon="el-icon-search"
              placeholder="请输入手机号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="图形验证码" prop="code">
            <el-input
              class="code-input"
              v-model="messageForm.code"
              maxlength="6"
              prefix-icon="el-icon-search"
              placeholder="请输入图形验证码"
              clearable
            ></el-input>
            <el-image class="code-img" :src="uuidImg" @click="initUuidImg" />
          </el-form-item>
          <el-form-item label="短信验证码" prop="smsCode">
            <el-input
              class="code-input"
              v-model="messageForm.smsCode"
              maxlength="6"
              prefix-icon="el-icon-search"
              placeholder="请输入验证码"
              clearable
            ></el-input>
            <el-button type="primary" :disabled="isDisabled" @click="getCode" class="getCode">
              {{ buttonName }}
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" style="fontsize: 14px; lineheight: 20px">
                  验证码发送次数规则：<br />
                  1.每日最多获取10次验证码，以起始时间计算24小时为一日。<br />
                  2.每小时最多获取5次验证码，以起始时间计算60分钟为一小时。<br />
                  3.若次数限制使用完或出现其它异常，请联系管理员处理。<br />
                </div>
                <i v-show="!isDisabled" class="el-icon-question el-icon--right icon-right"></i>
              </el-tooltip>
            </el-button>
          </el-form-item>
          <el-form-item label="设置密码" prop="password">
            <el-input
              v-model="messageForm.password"
              type="password"
              maxlength="10"
              prefix-icon="el-icon-search"
              placeholder="请输入密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="btn-log">
            <el-button type="primary" @click="messageLog('messageForm')" class="submit-btn"
              >立即注册</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="text" class="rt-btn" @click="toLogin()">立即登录</el-button>
          </el-form-item>
        </el-form>
        <div v-else class="next">
          <i class="el-icon-success success-icon"></i>
          <h2>恭喜, 注册成功 !</h2>
          <el-button class="into-btn" @click="toIndexPage()" type="primary" plain
            >进入系统</el-button
          >
          <el-button class="into-btn" @click="toApplyPage()" type="primary"
            >申请入驻, 开通更多权限</el-button
          >
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { title } from '@/settings'
import { sendResetPhone, registerUser, captchaImage, checkCaptcha } from '@/api/user'
import { USER_TYPE } from '@/utils/dict-enum'
import { editProjectParticipantStatus } from '@/api/cooperation/contacts.js'

export default {
  data() {
    return {
      hasRegister: false,
      uuidImg: null,
      uuid: null,
      title,
      messageForm: {
        phoneNum: null,
        code: null,
        password: null
      },
      rules: {
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
          { pattern: this.check.phone, message: '请输入正确的手机' }
        ],
        code: [
          { required: true, message: '请输入图形验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '用户密码只支持5-10位字符串',
            trigger: 'blur'
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,10}$/,
            message: '密码为字母和数字组合'
          }
        ]
      },
      isDisabled: false,
      buttonName: '获取验证码',
      time: 60
    }
  },
  created() {
    this.init()
    console.log(this.$route.query.projectParticipantId, 'this.$route.projectParticipantId')
  },
  methods: {
    init() {
      this.initUuidImg()
    },
    async initUuidImg() {
      console.log('initUuidImg')
      const res = await captchaImage()
      const { img, uuid } = res
      this.uuidImg = `data:image/png;base64,${img}` // 转义图形
      this.uuid = uuid
    },
    // 跳转到首页
    toIndexPage() {
      const RsaLoginForm = {
        username: this.messageForm.phoneNum,
        password: this.$md5(this.messageForm.password),
        userType: 2
      }
      this.$store
        .dispatch('user/login', RsaLoginForm)
        .then(() => {
          let { backUrl } = this.$route.query
          // 事项编辑登录后返回
          if (backUrl) {
            this.$router.push({
              path: backUrl,
              query: this.$route.query
            })
          } else {
            this.$router.push({
              path: '/'
            })
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 跳转申请入驻页面
    toApplyPage() {
      const RsaLoginForm = {
        username: this.messageForm.phoneNum,
        password: this.$md5(this.messageForm.password),
        userType: 2
      }
      this.$store
        .dispatch('user/login', RsaLoginForm)
        .then(() => {
          this.$router.push({
            path: '/process'
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    toLogin() {
      let { backUrl } = this.$route.query
      // 事项编辑登录后返回
      if (backUrl) {
        this.$router.push({
          path: '/login',
          query: this.$route.query
        })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    async messageLog(messageForm) {
      this.$refs[messageForm].validate(async (valid) => {
        if (valid) {
          const phone = this.messageForm.phoneNum
          const password = this.$md5(this.messageForm.password)
          // 用户注册请求
          registerUser({
            username: phone,
            password,
            smsCode: this.messageForm.smsCode,
            userType: USER_TYPE.COMPANY,
            tenantCode: 'admin'
          }).then((data) => {
            console.log(data)
            if (data.code === 200) {
              this.$message({
                showClose: true,
                type: 'success',
                message: '注册成功！'
              })

              this.hasRegister = true
              if (this.$route.query.projectParticipantId) {
                editProjectParticipantStatus({
                  projectParticipantId: this.$route.query.projectParticipantId
                }).then((res) => {
                  this.$message.success(res.msg)
                })
              }
            } else {
              this.$message({
                showClose: true,
                message: data.resultMsg,
                type: 'error'
              })
              // 登录失败则重置验证码
              setTimeout(this.initUuidImg, 2000)
            }
          })
        }
      })
    },
    // 获取验证码
    async getCode() {
      let that = this
      const regPhone = this.check.phone
      const { phoneNum: phone, code } = this.messageForm
      if (!phone) {
        this.$message({
          showClose: true,
          message: '手机号码不能为空!',
          type: 'error'
        })
        return false
      }
      if (!code) {
        this.$message({
          showClose: true,
          message: '图形验证码不能为空!',
          type: 'error'
        })
        return false
      }
      if (!regPhone.test(phone)) {
        this.$message({
          showClose: true,
          message: '手机号码格式错误!',
          type: 'error'
        })
        return false
      }
      // console.log(phone)
      // console.log(phone)
      const codeData = {
        uuid: this.uuid,
        username: phone,
        code
      }
      const res = await checkCaptcha(codeData).catch((err) => {
        setTimeout(that.initUuidImg, 2000)
      })
      if (res.data !== 1) return setTimeout(that.initUuidImg, 2000)
      //
      // 发送获取验证码请求
      sendResetPhone({
        tenantCode: 'admin',
        userType: USER_TYPE.PC,
        phone,
        code
      })
        .then((data) => {
          if (data.code === 200) {
            let me = this
            me.isDisabled = true
            let interval = window.setInterval(function () {
              me.buttonName = `${me.time}秒后重新发送`
              --me.time
              if (me.time < 0) {
                me.buttonName = '重新发送'
                me.time = 60
                me.isDisabled = false
                window.clearInterval(interval)
              }
            }, 1000)
          } else {
            setTimeout(that.initUuidImg, 2000)
            that.$message({
              showClose: true,
              message: data.resultMsg,
              type: 'error'
            })
          }
        })
        .catch((err) => {
          setTimeout(that.initUuidImg, 2000)
        })
      return true
      // // 检验手机是否已经注册
      // sendResetPhone({
      //   tenantCode: 'admin',
      //   userType: USER_TYPE.PC,
      //   phone
      // }).then((data) => {
      //   console.log(data)
      //   // 未注册
      //   if (data.code === 200) {
      //     // 发送获取验证码请求 type=0注册1登录2找回密码
      //     sendResetPhone({
      //       tenantCode: 'admin',
      //       userType: USER_TYPE.PC,
      //       phone
      //     }).then((data) => {
      //       console.log(data)
      //       if (data.resultCode == '0000') {
      //         let me = this
      //         me.isDisabled = true
      //         let interval = window.setInterval(function () {
      //           me.buttonName = `${me.time}秒后重新发送`
      //           --me.time
      //           if (me.time < 0) {
      //             me.buttonName = '重新发送'
      //             me.time = 60
      //             me.isDisabled = false
      //             window.clearInterval(interval)
      //           }
      //         }, 1000)
      //       } else {
      //         this.$message({
      //           showClose: true,
      //           message: data.resultMsg,
      //           type: 'error'
      //         })
      //       }
      //     })
      //   } else if (data.resultCode == '9999') {
      //     this.$message({
      //       showClose: true,
      //       message: data.resultMsg,
      //       type: 'error'
      //     })
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       type: 'error',
      //       message: '验证手机号码请求发送失败!'
      //     })
      // }
      // })
    }
  }
}
</script>

<style lang="scss">
#register {
  .info-form {
    background-color: #fff;
    border: 1px solid #fff;
    padding: 50px;
    padding-right: 80px;
  }
  .el-header {
    background-color: #e6e9ed;
    color: #383838;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    .topImg {
      position: absolute;
      height: 50px;
      margin: 5px;
    }
  }
  .el-main {
    display: flex;
    justify-content: center;
    .title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .rt-btn {
      color: #409eff;
      font-size: 14px;
    }
  }
  .el-footer {
    position: absolute;
    color: #383838;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    bottom: 0;
    width: 100%;
  }
  .getCode {
    font-size: 13px;
    width: 157px;
    vertical-align: top;
  }
  .code-input {
    width: 175px;
  }
  .code-img {
    width: 156px;
    vertical-align: bottom;
    height: 41px;
    cursor: pointer;
  }
  .btn-log {
    margin-bottom: 10px;
  }
  .submit-btn {
    width: 100%;
    font-size: 16px;
  }

  .qr-code {
    @include faj(center, center);
    img {
      width: 250px;
    }
  }
  .next {
    text-align: center;
    width: 549px;
    background-color: #fff;
    border: 1px solid #fff;
    padding: 50px;
    .success-icon {
      font-size: 80px;
      color: #157ef9;
    }
    .into-btn {
      display: block;
      width: 80%;
      margin: 30px auto;
    }
  }
}
</style>
