import { Injectable } from "@angular/core";
import{ HttpClient} from "@angular/common/http"

@Injectable({
    providedIn: 'root'
})

export class BookService{

    constructor(private http:HttpClient){}

    _bookUrl="https://localhost:44301/api/author/book";
    _uploadUrl = "https://localhost:44301/api/author/upload";

    
    saveBook(book: any){
        return this.http.post<any>(this._bookUrl, book);
      }

    GetBooks(){
        return this.http.get('http://localhost:3000/book');
    }
    uploadImage(formdata: any){
        return this.http.post<any>(this._uploadUrl, formdata);
    }
}