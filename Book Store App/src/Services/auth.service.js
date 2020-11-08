import axios from "axios";
import authHeader from './auth.header';

const API_URL = "https://ukiassignment4.herokuapp.com/api/auth/assignment/user";

class AuthService{
    
    login(username, password){
        return axios.post(API_URL + "/signin",{
            username,
            password
        })
        .then(Response => {
            if(Response.data.basicToken){
                localStorage.setItem("user", JSON.stringify(Response.data));
            }
            return Response.data;
        })
    }

    logout(){
        localStorage.removeItem("user");
        axios.post(API_URL + "/logout", {});
    }

    register(username, email, password){
        return axios.post(API_URL + "/signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));;
    }
    addUser(user){
        return axios.post(API_URL + "/signup", user, {headers: authHeader()})
    }

    getAllUser(){
        return axios.get(API_URL+'/',{headers: authHeader()});
    }
    deleteUser(userId){
        return axios.delete(API_URL +'/'+ userId, {headers: authHeader()});
    }
    fetchUserById(userId){
        return axios.get(API_URL+'/'+userId, {headers: authHeader()});
    }
    updateUser(user){
        return axios.put(API_URL +'/'+user.id, user, {headers: authHeader()});
    }

    getSearchUser(pageNo,pageSize, sortBy, searchText) {
        return axios.get(API_URL + '?pageNo=' + pageNo +  '&pageSize=' + pageSize + '&sortBy=' + sortBy + '&searchText=' + searchText);
    }

    getAllUserInPage(pageNo,pageSize, sortBy) {
        return axios.get(API_URL +'/page'+ '?pageNo=' + pageNo +  '&pageSize=' + pageSize + '&sortBy=' + sortBy);
    }
}
export default new AuthService();