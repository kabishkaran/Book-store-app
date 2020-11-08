import axios from 'axios';
import authHeader from './auth.header';


const API_URL = 'https://ukiassignment4.herokuapp.com/api/test/';

class UserService{
    getPublicContent(){
        return axios.get(API_URL + 'all');
    }

    getUserBoard(){
        return axios.get(API_URL + UserService, {headers: authHeader()});
    }

    getAdminBoard(){
        return axios.get(API_URL + 'admin', {headers: authHeader()});
    }
}

export default new UserService();