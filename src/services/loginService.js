import http from "./servicesHttp";

const LoginUser=(data)=>{
   return http.post("/user/login",data)
}
export default LoginUser;