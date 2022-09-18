import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  constructor(private book:BookService) { }
  books: any ="";
  // books: any = [
  //   { id:1,Title:"The Subtle Art of Not Giving a F*ck", Logo:"assets/images/subtle.jpg", Price:"318.00", Author:"Mark Manson", Category:"", Publisher:"",  PublisherDate:"", Chapters:"", active:true },
  //   { id:2,Title:"The Monk Who Sold His Ferrari", Logo:"assets/images/Monk.jpg", Price:"318.00", Author:"Robin Sharma", Category:"", Publisher:"",  PublisherDate:"", Chapters:"", active:true },
  //   { id:3,Title:"The Power of Your Subconscious Mind", Logo:"assets/images/power.jpg", Price:"318.00", Author:"Joseph Murphy",Category:"", Publisher:"",  PublisherDate:"", Chapters:"", active:true  },
  //   { id:4,Title:"Think and Grow Rich", Logo:"assets/images/think.jpg", Price:"318.00", Author:"Napoleon Hill", Category:"", Publisher:"",  PublisherDate:"", Chapters:"", active:true },
  //   { id:5,Title:"Who Will Cry When You Die?", Logo:"assets/images/who.jpg", Price:"318.00", Author:"Robin Sharma", Category:"", Publisher:"",  PublisherDate:"", Chapters:"", active:true },
  //   { id:6,Title:"Wings of Fire", Logo:"assets/images/wings.jpg", Price:"318.00", Author:"APJ Abdul Kalam", Category:"", Publisher:"",  PublisherDate:"", Chapters:"", active:true },
  //   { id:7,Title:"One Indian Girl", Logo:"assets/images/one.jpg", Price:"318.00", Author:"Chetan Bhagat", Category:"", Publisher:"",  PublisherDate:"", Chapters:"", active:true },
  //   { id:8,Title:"The Secret", Logo:"assets/images/secret.jpg", Price:"318.00", Author:"Rhonda Byrne", Category:"", Publisher:"",  PublisherDate:"", Chapters:"", active:true }
  // ]

  ngOnInit(): void {
    this.book.GetBooks().subscribe(res => {
      this.books = res;
   });
  }

}
