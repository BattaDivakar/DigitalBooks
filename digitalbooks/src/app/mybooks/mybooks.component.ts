import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReaderService } from '../services/reader.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit {
books: any;
  constructor(private readerservice : ReaderService, private authservice : AuthService) { }

  ngOnInit(): void {
    this.readerservice.MyBooks(this.authservice.getCurrentUserid()).subscribe(res => {
      this.books = res;
   });
  }
  
}
