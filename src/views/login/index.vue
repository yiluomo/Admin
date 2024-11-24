<template>
    <!-- elementplus的Layout布局 -->
    <el-row class="login-container" justify="center" align="middle">
        <el-card style="max-width: 480px;" class="no-body-card">
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="">
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="handleChange">{{ formType ? '返回登录' : '注册账号' }}</el-link>
            </div>
            <el-form ref="loginFormRef" :model="loginForm"  style="max-width: 600px"
                class="demo-ruleForm" :rules="rules">
                <!-- /账号 -->
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="手机号" clearable
                        prefix-icon="UserFilled"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.passWord" placeholder="密码" clearable
                        prefix-icon="Lock"></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item v-if="formType" prop="validCode">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" clearable prefix-icon="Lock">
                        <template #append>
                            <span @click="countdownChange">{{ countdown.validCode }}</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :style="{ width: '100%' }" @click="SubmitForm(loginFormRef)">
                        {{ formType ? '注册账号' : '登录' }}
                    </el-button>
                </el-form-item>  
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
import { ref, reactive ,computed,toRaw} from 'vue'
import { getCode, userAuthentication, login,menuPermissions } from '../../api'
import { ElMessage } from 'element-plus'
import { UserFilled, Lock } from "@element-plus/icons-vue"
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href

// 表单数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode: ''
})

// 切换表单（0登录 1注册）
const formType = ref(0)
// 点击切换登录和注册
const handleChange = () => {
    formType.value = formType.value === 0 ? 1 : 0
}

// 账号校验规则
const vaildateUser = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('账号不能为空'))
    } else {
        const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        phoneReg.test(value) ? callback() : callback(new Error('账号格式不正确,请输入正确手机号'))
    }
}

// 密码校验
const vaildatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    } else {
        const  reg = /^[a-zA-Z0-9_-]{4,16}$/
        reg.test(value) ? callback() : callback(new Error('密码格式不正确,请输入4-16位数字或字母'))
    }
}

// 表单校验
const rules = reactive({
    userName: [{ validator: vaildateUser, trigger: 'blur' }],//账号校验
    passWord: [{ validator: vaildatePass, trigger: 'blur' }]//密码校验
})

// 验证码
const countdown = reactive({
    validCode: '获取验证码',
    time: 60
})
let timer; // 定义定时器变量
let flag = false; // 定义 flag 变量

const countdownChange = () => {
    // 如果已发送不处理
    if (flag) return
    const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
        return ElMessage({
            message: '请检查手机号是否正确',
            type: 'warning',
        })
    }

    flag = true
    countdown.validCode = `剩余${countdown.time}秒`

    timer = setInterval(() => {
        if (countdown.time <= 0) {
            countdown.time = 60
            countdown.validCode = '获取验证码'
            clearInterval(timer)
            flag = false
        } else {
            countdown.time -= 1
            countdown.validCode = `剩余${countdown.time}秒`
        }
    }, 1000)

    // 发送验证码（向getCode传参发送请求）
    getCode({ tel: loginForm.userName })
        .then(({ data }) => {
            if (data.code === 10000) { // 确保返回的状态码是正确的
                ElMessage.success('验证码发送成功')
                alert(data.msg)
            } else {
                ElMessage.error(`验证码发送失败: ${data.message || '未知错误'}`)
            }
        })
        .catch((error) => {
            ElMessage.error('验证码发送失败')
            console.error(error)
        })
}

const router = new useRouter()
const loginFormRef = ref()
const store = useStore()

const routerList = computed(()=>store.state.menu.routerList)

// 表单提交
const SubmitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            console.log(loginForm, 'submit!')
            try {
                if (formType.value) {
                    const response = await userAuthentication(loginForm)
                    if (response.data.code === 10000) {
                        ElMessage.success('注册成功,请登录')
                        formType.value = 0
                    } else {
                        ElMessage.error('注册失败')
                    }
                } else {
                    const response = await login(loginForm)
                    if (response.data.code === 10000) {
                        ElMessage.success('登录成功')
                        localStorage.setItem('pz_token', response.data.data.token)
                        localStorage.setItem('pz_userInfo', JSON.stringify(response.data.data.userInfo))
                        menuPermissions().then(({data})=>{
                            store.commit('dynamicMenu',data.data)
                            console.log('routerList',routerList);
                            toRaw(routerList.value).forEach(item=>{
                                router.addRoute("main",item)
                            })
                            router.push("/")
                        })
                       
                    } else {
                        ElMessage.error('登录失败')
                    }
                }
            } catch (error) {
                ElMessage.error('请求失败')
                console.error(error)
            }
        } else {
            ElMessage.error('表单验证失败，请检查输入')
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang="less" scoped>
.no-body-card .el-card__body {
    padding: 0
}

:deep(.el-card__header) {
    padding: 0
}

.login-container {
    height: 100%;

    .card-header {
        background-color: #899fe1;

        img {
            width: 430px;
        }
    }

    .jump-link {
        text-align: right;
        margin-bottom: 10px;
    }
}
</style>