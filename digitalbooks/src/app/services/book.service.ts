import { Injectable } from "@angular/core";
import{ HttpClient, HttpParams} from "@angular/common/http"
import { Book } from "../models/bookmodel";

@Injectable({
    providedIn: 'root'
})

export class BookService{

    constructor(private http:HttpClient){}

    _bookUrl="https://localhost:44301/api/author/book";
    _uploadUrl = "https://localhost:44301/api/author/upload";
    _authorBookUrl = "https://localhost:44301/api/author";
    _getupdatebook = "https://localhost:44301/api/author/getUpdateBook";
    _updatebookurl = "https://localhost:44301/api/Author/UpdateBook";
    
    addBook(book: any){
        return this.http.post<any>(this._bookUrl, book);
      }
    editBook(id : number, book: any){
        console.log(id);
        console.log(book);
        return this.http.put<any>(this._updatebookurl, book);
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