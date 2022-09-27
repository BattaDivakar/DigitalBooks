import { Injectable } from "@angular/core";
import{ HttpClient, HttpParams} from "@angular/common/http"


@Injectable({
    providedIn: 'root'
})

export class ReaderService{

    constructor(private http:HttpClient){}

    _activeBooksUrl="https://localhost:44301/api/Reader/activeBooks";
    _searchBooksUrl = "https://localhost:44301/api/Reader/searchBooks";
    _bookDetails = "https://localhost:44301/api/Reader/GetBook";
    _createInvoiceUrl = "https://localhost:44301/api/Reader/CreateInvoice";
    _myBooksUrl = "https://localhost:44301/api/Reader/GetMyBooks";
    _myPayments = "https://localhost:44301/api/Reader/GetMyPayments";

    GetBooks(){
        return this.http.get(this._activeBooksUrl);
    }

    GetSearchBooks(author :string, title :string, publisher : string, category :string)
    {
        return this.http.get(this._searchBooksUrl, {
            params:new HttpParams().append("author", author)
                                    .append("title", title)
                                    .append("publisher", publisher)
                                    .append("category", category)
        });
    }

    GetBook(id: number){
        return this.http.get(this._bookDetails, {params:new HttpParams().append("id", id)});
    }

    CreateInvoice(invoice : any){
        return this.http.post<any>(this._createInvoiceUrl, invoice);
    }

    MyBooks(id : number){
        return this.http.get(this._myBooksUrl, {params:new HttpParams().append("id", id)});
    }

    MyPayments(id: number){
        return this.http.get(this._myPayments, {params:new HttpParams().append("id", id)});
    }
}