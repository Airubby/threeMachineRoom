import axios from "axios";
let service = axios.create({
  // baseURL: 'http://www.javasoft.top:9090/service',
  baseURL: "/",
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return error.response;
    return Promise.reject("重新登录");
    
  }
);

// export default service;
export default {
  get: function (url, params, response,errorResponse) {
    return service.get(url,{params:params}).then(res=>{
      if(response){
        response(res);
      }
    }).catch( error=> {
      if(errorResponse){
        errorResponse(error);
        console.log(error);
      }
    })
  },
  post: function (url, params, response,errorResponse) {
    return service.post(url,params).then(res=>{
      if(response){
        response(res);
      }
    }).catch( error=> {
      if(errorResponse){
        errorResponse(error);
        console.log(error);
      }
    })
  },
  //post请求参数放url中
  postQuery: function (url, params, response,errorResponse) {
    return service.post(url,null,{params:params}).then(res=>{
      if(response){
        response(res);
      }
    }).catch( error=> {
      if(errorResponse){
        errorResponse(error);
        console.log(error);
      }
    })
  },
  service:service
}