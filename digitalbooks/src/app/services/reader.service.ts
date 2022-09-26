import { Injectable } from "@angular/core";
import{ HttpClient, HttpParams} from "@angular/common/http"


@Injectable({
    providedIn: 'root'
})

export class ReaderService{

    constructor(private http:HttpClient){}

    _activeBooksUrl="https://localhost:44301/api/Reader/activeBooks";

    GetBooks(){
        return this.http.get(this._activeBooksUrl);
    }
    
}