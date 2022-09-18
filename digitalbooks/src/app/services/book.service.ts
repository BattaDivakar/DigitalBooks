import { Injectable } from "@angular/core";
import{ HttpClient} from "@angular/common/http"

@Injectable({
    providedIn: 'root'
})

export class BookService{

    constructor(private http:HttpClient){}

    GetBooks(){
        return this.http.get('http://localhost:3000/book');
    }
}