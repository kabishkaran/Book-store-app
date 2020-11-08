import axios from "axios";
import authHeader from './auth.header';

const API_URL = "https://ukiassignment4.herokuapp.com/api/auth/assignment/book";

class BookService{

    getSearchBook(pageNo,pageSize, sortBy, sortDir, searchText) {
        return axios.get(API_URL + '?pageNo=' + pageNo +  '&pageSize=' + pageSize + '&sortBy=' + sortBy + '&sortDir='+ sortDir + '&searchText=' + searchText);
    }

    getBookById(bookId){
        return axios.get(API_URL+'/'+bookId)
    }

    deleteBook(bookId){
        return axios.delete(API_URL+'/'+bookId)
    }

    updateBook(book){
        return axios.put(API_URL+'/'+book.id, book)
    }

    addBook(book){
        return axios.post(API_URL,book)
    }
}
export default new BookService;