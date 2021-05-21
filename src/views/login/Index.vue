<template>
    <div class="content-inside">
        <div class="login">
            <div class="left">
                <!--                <img src="./images/logo.png" alt="">-->
                <div>系统登录页</div>
            </div>
            <div class="blur">
                <div class="blur-color"></div>
            </div>
            <div class="right">
                <div class="title">用户登录</div>
                <el-form :model="loginInfo" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item prop="loginName" label-width='0px'>
                        <el-input v-model="loginInfo.loginName" placeholder="用户名" class="userName"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label-width='0px'>
                        <el-input v-model="loginInfo.password" placeholder="密码" class="password"
                                  @keyup.native.enter="login"
                                  type="password"></el-input>
                    </el-form-item>
                    <el-form-item label-width='0px'>
                        <el-button type="primary" @click="login">登 录</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
        <!--        <div class="footer">中共宁波市海曙区纪律检查委员会 宁波市海曙区监察委员会</div>-->
    </div>
</template>

<script lang="ts">
import {defineComponent, inject, reactive} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default defineComponent({
    name: 'login',
    setup() {
        const $app: any = inject('$app');
        // console.log($app);
        const loginInfo = reactive({
            loginName: 'weite',
            password: 'admin'
        });
        const store = useStore();
        const router = useRouter();
        const login = () => {
            $app.$api.all('post','/api/login',{
                ...loginInfo
            }).then(res => {
                $app.$store.dispatch('setToken');
                $app.$router.replace('/main');
            });

        };
        return {
            loginInfo,
            login
        };
    }
});
</script>


<style scoped lang="scss">
.content-inside {
    width: 100%;
    height: 100%;
    min-height: 600px;
    background: url('./images/loginbgc.jpg') no-repeat fixed;
    background-size: cover;
    display: flex;
    position: relative;

    .login {
        position: relative;
        width: 1059px;
        height: 480px;
        margin: auto;
        border: 5px solid #fff;
        overflow: hidden;
        border-radius: 20px;
        box-shadow: 15px -15px 0 rgba(255, 255, 255, .4), -15px 15px 0 rgba(0, 0, 0, .2);

        .left {
            position: absolute;
            width: 700px;
            height: 480px;
            z-index: 99999;
            text-align: center;
            display: grid;
            place-items: center;

            img {
                width: 161px;
                height: 69px;
                margin: 157px auto 33px auto;
            }

            div {
                font-size: 36px;
                color: #fff;
                font-weight: bold;
                text-shadow: -2px 1px 5px #000000;
                cursor: default;
            }
        }

        .blur-color {
            width: 100%;
            height: 100%;
            background: rgba(0, 61, 191, .2);
        }

        .blur {
            display: inline-block;
            width: 700px;
            height: 480px;
            background: url('./images/loginbgc.jpg') no-repeat fixed;
            background-size: cover;
            filter: blur(5px);
        }

        .right {
            position: absolute;
            right: 0;
            top: 0;
            width: 350px;
            height: 480px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            //border-radius:0 20px 20px 0;

            .title {
                margin: 69px 0 59px 0;
                color: #4D7ADA;
                font-size: 36px;
                cursor: default;
            }

            ::v-deep.el-form {
                margin-bottom: 20px;

                .el-form-item__content {
                    width: 260px;

                    .el-input {
                        height: 44px;

                        .el-input__inner {
                            border: 1px solid #DBDBDB;
                            border-radius: 3px;
                            background-color: #FFFFFF;
                            font-size: 14px;
                            color: #333;
                            padding: 0 45px;
                            background-repeat: no-repeat;
                            background-position: 10px 10px;
                            background-size: 21px 21px;
                        }
                    }

                    .userName {
                        .el-input__inner {
                            background-image: url('./images/icon-user.png');
                        }
                    }

                    .password {
                        .el-input__inner {
                            background-image: url('./images/icon-password.png');
                        }
                    }

                    .el-button {
                        width: 100%;
                        height: 44px;
                        font-size: 16px;
                        background: #4D7ADA;
                        border-radius: 3px;
                        margin-top: 20px;
                    }
                }
            }

            .download {
                text-decoration: underline;
                color: #4D7ADA;
                font-size: 14px;
            }
        }
    }

    .footer {
        position: absolute;

        //小屏优先
        bottom: 20px;
        left: 0;
        width: 100%;
        text-align: center;
        color: #FFFFFF;
        font-size: 14px;

        //过度动画
        transition: bottom .5s ease;

        ////大屏适配
        //@include breakpoint(null, 700px) {
        //    bottom: 42px;
        //}
    }
}
</style>


