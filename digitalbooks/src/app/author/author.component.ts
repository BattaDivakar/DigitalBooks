import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buffer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  booklist: any;
  token : any;
  constructor(private _bookService:BookService,private _author : AuthService, private router: Router) { }

  ngOnInit(): void {

     this._bookService.authorBooks(this._author.getCurrentUserid())
     .subscribe(res => {this.booklist = res},
      res => console.log(res));
  }
  editBook(id:any)
  {
    this.router.navigate(['/author/managebook', btoa(id)]);
  }

}
