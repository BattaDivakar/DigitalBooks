import { Injectable } from "@angular/core";
import{ HttpClient, HttpParams} from "@angular/common/http"
import { Book } from "../models/bookmodel";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class BookService{

    constructor(private http:HttpClient){}

    _bookUrl= environment.baseUrl+"author/book";
    _uploadUrl = environment.baseUrl+"author/upload";
    _authorBookUrl = environment.baseUrl+"author/getauthorbooks";
    _getupdatebook = environment.baseUrl+"author/getUpdatebook";
    _updatebookurl = environment.baseUrl+"author/updatebook";
    
    addBook(book: any){
        return this.http.post<any>(this._bookUrl, book);
      }
    editBook(id : number, book: any){
        return this.http.put<any>(this._updatebookurl, book);
    }
    getToken(){
        return localStorage.getItem('token');
      }
    uploadImage(formdata: any){
        return this.http.post<any>(this._uploadUrl, formdata);
    }
    authorBooks(id : number){
        return this.http.get(this._authorBookUrl, {params:new HttpParams().append("id", id)});
     }
     getupdatebook (id: number){
        return this.http.get<Book>(this._getupdatebook, {params:new HttpParams().append("id", id)});
     }
}