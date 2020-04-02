<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="my login logo" />
    </div>
    <!-- 手机号 -->
    <InputGroup
      type="number"
      placeholder="请输入手机号"
      v-model="phoneNum"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phoneNum"
      @btnClick="getVerifyCode"
    />
    <!-- 验证码 -->
    <InputGroup
      type="number"
      placeholder="请输入验证码"
      v-model="verifyCode"
      :error="errors.verifyCode"
    />
    <!-- 用户协议 -->
    <div class="user-agreement">
      <p>新用户登录即自动注册，表示已同意<span>《用户服务协议》</span></p>
    </div>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <button :disabled="isClick" @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import InputGroup from "../components/InputGroup"
export default {
  name: "Login",
  data() {
    return {
      phoneNum: '',
      verifyCode: '',
      btnTitle: "获取验证码",
      disabled: false,
      errors: {}
    }
  },
  components: {
    InputGroup
  },
  computed: {
    isClick() {
      return this.phoneNum && this.verifyCode ? false : true;
    }
  },
  methods: {
    login(){
      this.errors = {}
      this.$axios.post('/api/posts/sms_back', {
        phone: this.phoneNum,
        code: this.verifyCode
      })
      .then(res => {
        window.localStorage.setItem('isLogin', true);
        this.$router.push('/')
      })
      .catch(err => {
        this.errors = {
          code: err.response.data.msg
        }
      })
    },
    getVerifyCode() {
      if (this.validatePhone()){
        // 60s倒计时
        this.validateBtn()
        // 发送网络请求获取验证码
        this.$axios.post('/api/posts/sms_send', {
          sid: "211870fe4fef6c3cc713e909e7706c96",
          token: "fe98fbfa722a992a0714700034bedbd9",
          appid: "4b96b5a5bc2b44c7bc281d5874f974ec",
          templateid: "537961",
          phone: this.phone
        })
        .then(res => {
          console.log('验证：', res)
        })
        .catch(err => {

        })
      }
    },
    validatePhone() {
      if (!this.phoneNum) {
        this.errors = {
          phoneNum: '手机号不能为空'
        }
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phoneNum)) {
        this.errors = {
          phoneNum: '手机号格式不正确'
        }
        return false;
      } else {true
        this.errors = {}
        return true;
      }
    },
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          this.btnTitle = time + "s后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="stylus">
.login {
  height: 100vh;
  padding: 30px;
  background-color: #fff;
}
.logo {
  text-align: center;

  img {
    width: 150px;
  }
}
.user-agreement p{
  font-size: 12px;
  color: #aaa;
}
.user-agreement span{
  font-size: 12px;
  color: #4d90fe;
}
.login-btn button{
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background-color: #4d90fe;
  border-radius: 4px;
}
.login-btn button[disabled]{
  background-color: #ccc;
}
</style>
