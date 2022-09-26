import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.css']
})
export class SearchbooksComponent implements OnInit {
  Author: string="";
  Title: string ="";
  Publisher : string = "";
  Category: string="";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  SearchBookList()
  {
    this.router.navigate(['/booklist', this.Author, this.Title, this.Publisher, this.Category]);
  }
}
