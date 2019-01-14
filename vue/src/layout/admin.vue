<style lang="less">
.layout {
    .layout-nav {
        background: #495060;
        position: fixed;
        top: 60px;
        left: 0px;
        bottom: 0px;
        width: 240px;
        overflow: hidden;
        z-index: 999;
    }
    &.layout-mobile {
        .layout-nav {
            width: 240px;
            .layout-text {
                display: none;
            }
        }
        .layout-main {
            left: 240px;
        }
        .logo {
            width: 240px!important;
        }
    }
    .layout-main {
        position: absolute;
        left: 240px;
        right: 0;
        top: 60px;
        bottom: 0;
        z-index: 998;
        width: auto;
        overflow: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        min-width: 600px;
        background-color: #f1f4f6;
        .layout-content {
            padding: 15px 15px 15px 15px;
        }
        .panel {
            padding: 15px;
            background-color: #fff;
            border: 1px solid transparent;
            border-radius: 3px;
            -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
            .panel-heading {
                text-align: left;
                width: 100%;
                border-radius: 4px 4px 0 0;
                border-bottom: 1px solid #eeeff1;
                padding: 15px;
                font-size: 16px;
                font-weight: 700;
            }
        }
        .vm-author {
            line-height: 45px;
            font-size: 14px;
            text-align: center;
            a {
                color: #1d8ce0;
            }
        }
    }
    .layout-header {
        position: fixed;
        width: 100%;
        min-width: 375px;
        height: 60px;
        padding: 0 10px 0 0;
        background-color: #3c8dbc;
        z-index: 999;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
        .logo {
            float: left;
            height: 60px;
            color: #fff;
            width: 240px;
            overflow: hidden;
            padding-right: 10px;
            padding-left: 10px;
            background-color: #367fa9;
            text-align: center;
            a {
                color: #fff;
                line-height: 60px;
                font-size: 16px;
                img {
                    width: auto;
                    vertical-align: middle;
                }
            }
        }
        .layout-top {
            float: right;
            a {
                color: #fff;
                line-height: 60px;
                font-size: 16px;
                height: 60px;
                span {
                    vertical-align: middle;
                    margin-right: 6px;
                }
            }
            li {
                i {
                    margin-right: 6px;
                }
            }
        }
        .toggle {
            height: 60px;
            color: white;
            float: left;
        }
    }
}
</style>
<template>
<div class="layout" :class="{'layout-mobile': toggle}">
    <div class="layout-header">
        <div class="logo">
            <a href="/">
                    <span>权 限</span>
                </a>
        </div>
        <div>
            <Button type="text" class="toggle" @click="toggleClick">
                    <Icon type="navicon" size="16"></Icon>
                </Button>
        </div>
        <div class="layout-top">
            <Dropdown placement="bottom-end">
                <a href="javascript:void(0)">
                    <Avatar icon="person" />{{sysUserName}}
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <Dropdown-menu slot="list">
                    <Dropdown-item @click.native="changePwd">修改密码</Dropdown-item>
                    <Dropdown-item @click.native="logout">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
        </div>
    </div>
    <div class="layout-nav">
        <sidebar :shrink="toggle"></sidebar>
    </div>
    <div class="layout-main">
        <div class="layout-content">
            <div class="panel">
                <router-view></router-view>
            </div>
        </div>
        <p class="vm-author">相寓业务系统 designed by
            <a href="#" target="_blank">相寓创研中心</a>
        </p>
    </div>
    <Modal v-model="showChangePwdModal" title="修改密码" :mask-closable="false">
        <div class="change-pwd">
            <Form ref="pwdForm" :model="formPwd" :rules="ruleInline">
                <FormItem label="原密码" prop="oldPwd">
                    <Input type="password" v-model="formPwd.oldPwd" placeholder="请输入旧密码">
                    </Input>
                </FormItem>
                <FormItem label="新密码" prop="newPwd">
                    <Input type="password" v-model="formPwd.newPwd" placeholder="请输入新密码">
                    </Input>
                </FormItem>
                <FormItem label="确认密码" prop="surePwd">
                    <Input type="password" v-model="formPwd.surePwd" placeholder="请输入确认密码">
                    </Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="doChange()">提交</Button>
            <Button  @click="handleReset()" style="margin-left: 8px">重置</Button>
        </div>
    </Modal>
</div>
</template>
<script>
import sidebar from './sidebar';
import api from '../api'
export default {
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码'));
            } else {
                if (this.formPwd.newPwd === this.formPwd.surePwd) {
                    callback();
                }
                callback(new Error('两次密码输入不一致，请重新输入'));
            }
        };
        return {
            toggle: false,
            showChangePwdModal: false,
            sysUserName: '',
            formPwd: {
                oldPwd: '',
                newPwd: '',
                surePwd: ''
            },
            ruleInline: {
                oldPwd: [{
                    required: true,
                    message: '请输入旧密码',
                    trigger: 'blur'
                }],
                newPwd: [{
                    required: true,
                    message: '请输入新密码',
                    trigger: 'blur'
                }],
                surePwd: [{
                    required: true,
                    validator: validatePass,
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted() {
        let user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.real_name;
        }
    },
    methods: {
        toggleClick() {
            this.toggle = !this.toggle;
        },
        changePwd() {
            this.showChangePwdModal = true;
        },
        doChange() {
            this.$refs['pwdForm'].validate(async(result) => {
                if (result) {
                    api.password(this.formPwd).then( res => {
                        if (res){
                            this.$Message.success(res);
                            this.showChangePwdModal = false;
                        }
                    })
                }
            });
        },
        handleReset() {
            this.$refs['pwdForm'].resetFields();
        },
        logout() {
            var _this = this;
            this.$Modal.confirm({
                title: '提示',
                content: '确认退出吗?',
                onOk: () => {
                    api.logout().then( res => {
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        _this.$router.push('/login');
                    })
                }
            });
        }
    },
    watch: {
        '$store.state.warnMsg' (val) {
            if (val) {
                this.$Notice.warning({
                    title: '提示',
                    desc: val
                });
                this.$store.commit('warnMsg', '');
            }
        },
        '$store.state.errMsg' (val) {
            if (val) {
                alert(val)
                this.$store.commit('errMsg', '');
            }
        }
    },
    components: {
        sidebar
    }
}
</script>
