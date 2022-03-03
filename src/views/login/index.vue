<template>
  <div class="login">
    <div class="loginLay">
      <nav>
        <span>智慧食堂服务管理平台</span>
        <span>服务管理平台</span>
      </nav>
      <div>
        <el-input
          v-model="username"
          placeholder="Please input"
        >
          <template #prepend>用户名</template>
        </el-input>
        <el-input
          v-model="password"
          placeholder="Please input"
        >
          <template #prepend>密码</template>
        </el-input>

        <el-button @click="loginFn">登录</el-button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

import sha1 from 'sha1'
import JSEncrypt from 'encryptlong'
import { useRouter } from 'vue-router'

/**
@params 账号登入模块
*/
function loginModel () {
  const loginForm = reactive({
    username: 'chenqi',
    password: '1234qwer'
  })

  const store = useStore()
  const router = useRouter()
  const loginFn = () => {
    var encryptor = new JSEncrypt() // 创建加密对象实例
    // 之前ssl生成的公钥，复制的时候要小心不要有空格
    var pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUmFLuydmxpTm61paWkbwyqy03zAAiWBYqLLDfWGdC1qdyMkrQ8oernO2o2MhUA4KeqzYg2dbyS8lz/9kMbRDP1icVsaQjzjoJ+ld0ajZfnWkkTVfb5xhhzlkS2fTZLtttGhgpVuHJdHAmH/0+wYiA3u6lVV6cDLfpJqOrKq/2MQIDAQAB'
    encryptor.setPublicKey(pubKey)// 设置公钥
    const data = {
      username: loginForm.username,
      password: loginForm.password,
      roleId: 1
    }
    data.password = encryptor.encryptLong(sha1(data.password))
    store.dispatch('user/login', data).then(res => {
      router.replace('/')
    }).catch(err => {
      console.log(err)
    })
  }
  return {
    ...toRefs(loginForm),
    loginFn
  }
}
const { username, password, loginFn } = loginModel()
</script>

<script>
export default {
  name: 'login'
}
</script>

<style lang='scss'>
.login {
  min-width: 1000px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('https://zhst-prod.oss-cn-hangzhou.aliyuncs.com/images/login_bg.jpg')
    no-repeat;
  background-size: cover;
  .loginLay {
    width: 850px;
    height: 460px;
    padding: 80px 0;
    background: #fff;
    color: #999;
    background: rgba(255, 255, 255, 0.25);
  }
}
</style>
