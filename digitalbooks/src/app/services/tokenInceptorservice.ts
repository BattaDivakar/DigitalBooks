import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from './book.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


    constructor(private injector: Injector) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let bookService = this.injector.get(BookService);
        let tokenizedreq = req.clone({
            headers: req.headers.set('Authorization', 'bearer ' + bookService.getToken())
        })

        return next.handle(tokenizedreq);
    }

}