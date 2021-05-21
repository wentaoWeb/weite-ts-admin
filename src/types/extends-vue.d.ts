import VueRouter, {Route} from 'vue-router'

declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter
        $route: Route,
        LOGIN_INFO: sys.loginInfo,

        readonly DEFAULT_MSG: {
            SUCCESS: '操作成功!',
            FAIL: '操作失败!'
        }
        $px2rem(px:number|string):number
        $rem2px(px:number|string):number

        //根据权限码判断当前登录用户是否拥有权限
        $SSO_AUC(code: string): boolean
        //通过函数的方式获取登录用户信息(在列表渲染函数中可能无法通过vuex的属性获取)
        $getLoginInfo():sys.loginInfo
        $baseUrl:string
        demoColumns:any
        demoDataList:any
    }
}
