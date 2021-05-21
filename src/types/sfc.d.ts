interface Window {
    //允许任意属性存在
    [propName: string]: any
}

declare module "d3"
declare module "venn.js"
declare module "vue-touch-ripple"
declare module "@/components/date-picker/src/picker/date-picker.js"
declare module "@/components/date-week-range/src"

//覆盖某类型
declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
declare var WxLogin: any

//定义系统业务数据模型
declare namespace sys {
    type loginInfo = {
        //是否是管理员账号
        $isAdmin?: boolean
        name?: string
        loginName?: string
        uid?: string,
        type?: {
            name: string,
            disName: string
        },
        telephone?: string
        userAppList?: any[],
        resourceList?: { code: string }[],
        //版本权限
        editionConfigs?: { resourceList: any[], type: any }[]
        userAllEditionData: {
            isExpire: boolean
            uid: string
            type: {
                name: string
                disName: string
            }

        }[]
    }
}

declare type DicType = {
    code: string
    name: string
}