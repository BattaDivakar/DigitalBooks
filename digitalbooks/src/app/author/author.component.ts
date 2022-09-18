import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  booklist: any;
  token : any;
  constructor(private book:BookService, private router: Router) { }

  ngOnInit(): void {
     this.book.GetBooks().subscribe((res:any) => {
        this.booklist = res.filter(function(ele: any){
          return ele.email == localStorage.getItem('token');
        });
        
        
     });
     
  }
  addbook()
  {
    this.router.navigate(['/author/managebook']);
  }

}
