import axios, {AxiosInstance, AxiosResponse, Method} from 'axios';
import qs from 'qs';
import {ElLoading, ElNotification,ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import store from '@/store/index.ts';
import router from "@/router/index.ts"

import {traverseArray} from '@/utils/index.ts';

// console.log(router);
//创建axios请求
const instance = axios.create();
//设置拦截器
setInterceptors(instance);

const baseUrl = 'https://www.fastmock.site/mock/40bda03beca13f6b447c68bdad2bfd79/weite-ts-admin';

function get(api: string, params?: any) {
    return instance({
        method: 'get',
        url: api,
        baseURL: baseUrl,
        params: params
    }).then(response => response.data).catch((err) => {
        console.log(err);
    });

}

function all(methods: Method, api: string, params: any, load?: any) {
    const i = instance({
        method: methods,
        url: api,
        baseURL: baseUrl,
        data: params,
        load: load || {isUpload:false},
        notProcessed:false
    });
    return (i as Promise<unknown> as Promise<any>);
}

function post(api: string, params?: any) {
    return instance({
        method: 'post',
        url: api,
        baseURL: baseUrl,
        headers: {'Content-Type': 'aplication/json'},
        data: params
    }).then(response => response.data).catch((err) => {
        console.log(err);
    });

}

//拦截器
function setInterceptors(instance: AxiosInstance) {
    if (!instance) {
        return;
    }
    // 添加请求拦截器
    // @ts-ignore
    instance.interceptors.request.use((config) => {
        // console.log(config);
        //设置统一令牌
        if (store.state.token) {
            config.headers.common['token'] = store.state.token;
        }
        //上传判断
        if (config.load.isUpload) {
            config.headers['Content-Type'] = 'multipart/form-data';
            config.headers['processData'] = false;

            //修复上传文件时不能传输复杂类型的问题
            config.data = traverseArray(config.data, true);

            let fd = new FormData();
            for (let key of Object.keys(config.data)) {
                let val = config.data[key];
                if (val === null) {
                    break;
                }
                if (Array.isArray(val)) {
                    for (let item of val) {
                        fd.append(key, item);
                    }
                } else {
                    fd.append(key, val);
                }
            }

            fd.append('token', store.state.token);

            config.data = fd;
        } else {
            //修复application/json传参的问题
            if (config.headers['Content-Type'] !== 'application/json') {
                //allowDots:转换复杂类型对象; strArray:是否纯字符串数组,暂时不要混合复杂类型和纯数组提交;
                config.data = qs.stringify(config.data, {
                    allowDots: true,
                    arrayFormat: config.strArray ? 'brackets' : undefined
                });
            }
        }

        // 在发送请求之前做些什么
        if (!config.load) {
            config.load = {};
        }
        if (!config.load.noLoading) {
            let loadConfig = config.load;

            if (loadConfig.fullLoading) {//全屏遮罩
                config.loadTimeout = setTimeout(() => {
                    config.loadingInstance = ElLoading.service({
                        fullscreen: true,
                        text: loadConfig.msg || '正在加载...'
                    });
                }, 500);
            } else {
                //延迟启动,如果等待时间过短不启动动画
                config.loadTimeout = setTimeout(() => {
                    if (loadConfig.el) {
                        config.loadingInstance = ElLoading.service({
                            target: (<HTMLElement> loadConfig.el),
                            text: loadConfig.msg || '正在加载...'
                        });
                    } else {
                        NProgress.start();
                    }
                }, 500);
            }

        }

        return config;

    }, function(error) {
        hideLoad(error);
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    //正常响应回调
    async function responseCallBack(response: AxiosResponse, data: any, resolve: Function, reject: Function) {
        if (data.status === 200) {
            resolve(data);
        } else if (data.status === 1000 || data.status === 1001 || data.status === 401) {
            ElMessage.error(data.message || '服务异常')
            //不做处理
            if (!response.config.notProcessed) {
                await store.dispatch('logout');
                //路由跳转
                await router.push('/login')
            }
            reject(data);
        } else {
            //不做处理
            if (!response.config.notProcessed) {
                ElNotification({
                    type:'error',
                    title: '操作失败',
                    message: data.message ? data.message : undefined
                });
            }
            reject(data);
        }
    }

    //响应拦截器
    // @ts-ignore
    instance.interceptors.response.use((response: any) => {
        hideLoad(response);

        let data = response.data || {};
        return new Promise(function(resolve, reject) {
            //下载文件,当blob类型为application/json时认为返回失败,解析成json按照正常逻辑处理
            if (data.toString() === '[object Blob]') {
                if (data.type === 'application/json') {
                    //将blob转成json
                    let reader = new FileReader();
                    reader.onload = function(e: any) {
                        responseCallBack(response, JSON.parse(e.target.result), resolve, reject);
                    };
                    reader.readAsText(data);
                } else {
                    //下载文件时返回整个response
                    downloadFile(response);
                    resolve(response);
                }
            } else {
                responseCallBack(response, data, resolve, reject);
            }
        });
    });
}




/**
 * blob下载（兼容IE）
 * @param  response
 */
function downloadFile(response: any) {
    let content: Blob
    const filename = decodeURI(escape(response.headers['content-disposition'].split('filename=')[1]))
    if ('download' in document.createElement('a')) {
        content = response.data
    } else {
        ElNotification({
            type:'error',
            message:'浏览器不支持'
        })
        return;
    }
    const blob = new Blob([content]);
    // IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
        downloadByA(window.URL.createObjectURL(blob), filename)
    }
}

/**
 * 通过a标签模拟下载
 * @param {String} href
 * @param {String} filename
 */
function downloadByA(href: string, filename: string) {
    const a = document.createElement('a')
    a.download = filename
    a.style.display = 'none'
    a.href = href
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(href)
}

/**
 * 通用文件下载,不支持参数为文件
 * @param url 下载的接口地址
 * @param data 参数
 * @param method 方式
 * @param target 跳转方式(和a标签一致)
 */
const ajaxDownload = function (url: string, data: any = {}, method?: string, target?: string) {
    url = baseUrl + url;

    data = Object.assign(true, {token: store.state.token}, data);
    let delKeys: any = [];
    for (let index of Object.keys(data)) {
        let item: any = data[index];
        if (item == undefined || item == 'undefined') {
            delKeys.push(index);
        }
        //数组类型的暂时认为是字符串数组
        if(Array.isArray(item)){
            data[index] = item.join(',')
        }
    }
    for (let item of delKeys) {
        delete data[item];
    }
    // 获取url和data
    if (url && data) {
        // 把参数组装成 form的 input
        let inputs = '';
        for (let key of Object.keys(data)) {
            let value = data[key];
            if (!Array.isArray(value)) {
                inputs += `<input type="hidden" name="${key}" value="${value}" />`;
            } else {
                // 数组
                for (let [index, item] of value.entries()) {
                    if (Array.isArray(item)) {
                        inputs += `<input type="hidden" name="${key}[]" value="${item}" />`;
                    } else {
                        if (!item) {
                            continue
                        }
                        for (let sKey of Object.keys(item)) {
                            let sValue = item[sKey];
                            inputs += `<input type="hidden" name="${key}[${index}].${sKey}" value="${sValue}" />`;
                        }
                    }
                }
            }
        }
        // request发送请求
        const formEle: HTMLFormElement = document.createElement('form');
        formEle.innerHTML = inputs;
        formEle.action = url;
        formEle.method = method || 'post';
        formEle.target = target || '_target';
        document.body.appendChild(formEle);
        formEle.submit();
        //formEle.remove();
    }
};


//接口请求加载动画
const hideLoad = (response: any) => {
    let config = response.config;
    config = Object.assign({load: {}}, config);
    //当请求关闭加载显示时不取消加载动画,修复隐藏重复执行的接口关闭动画的问题
    if (config.load.noLoading) {
        return;
    }
    if (config.loadingInstance && typeof config.loadingInstance.close === 'function') {
        config.loadingInstance.close();
    }
    if (config.loadTimeout) {
        clearTimeout(config.loadTimeout);
    }
    NProgress.done();
};

export default {
    get,
    post,
    all,
    ajaxDownload
};
