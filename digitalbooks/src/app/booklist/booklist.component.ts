import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BookService } from '../services/book.service';
import { ReaderService } from '../services/reader.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  constructor(private book: ReaderService, private route : ActivatedRoute) { }
  books: any ="";
  ngOnInit(): void {
    this.book.GetBooks().subscribe(res => {
      this.books = res;
   });
  }

}
