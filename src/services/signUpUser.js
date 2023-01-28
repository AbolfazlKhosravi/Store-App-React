import http from "./servicesHttp";

const signUpUser=(data)=>{
   return http.post("/user/register",data)
}
export default signUpUser;