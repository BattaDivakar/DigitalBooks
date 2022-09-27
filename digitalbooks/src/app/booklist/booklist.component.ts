import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { ReaderService } from '../services/reader.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  constructor(private readerservice: ReaderService, private route : ActivatedRoute, private router :Router) { }
  books: any ="";
  Author: string="";
  Title: string ="";
  Publisher : string = "";
  Category: string="";

  ngOnInit(): void {
    let sub = this.route.params.subscribe(params =>{
        this.Author = params['Author'];
        this.Title =  params['Title'];
        this.Publisher = params['Publisher'];
        this.Category = params['Category'];
    });
    if(this.Author || this.Title ||  this.Publisher|| this.Category)
    {
      this.readerservice.GetSearchBooks(this.Author, this.Title, this.Publisher, this.Category).subscribe(res => {
        this.books = res;
     });
    }
    else {
      this.readerservice.GetBooks().subscribe(res => {
        this.books = res;
     });
    }
  }
  GetBooK(id :any){
    this.router.navigate(['/book', btoa(id)]);
  }
}
