import axios from "axios";


export function request(config, success, failure) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/API/M5',
    timeout: 1000,
  })
  //2.axios的拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    //1.比如说config中的一些信息不符合服务器中的要求
    //2.比如每次发送网络请求是，都希望在界面中显示一个请求的图标
    //3.某些网络请求（比如登录token），必须携带一些特殊的信息
    return config
  }, err => {
    // console.log(err);
  });
  //2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
  //发送真正的网络请求
  return instance(config)
  // .then(res => {
  //   console.log(res);
  //   success(res)
  // })
  // .catch(err => {
  //   console.error(err)
  //   failure(err)
  // })
}
