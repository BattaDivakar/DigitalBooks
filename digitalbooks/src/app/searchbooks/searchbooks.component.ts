import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private router: Router, private author : AuthService) { }

  ngOnInit(): void {
    if(this.author.getroleid() === 1)
    {
      this.router.navigate(['/author'])
    }
  }

  SearchBookList()
  {
    this.router.navigate(['/booklist', this.Author, this.Title, this.Publisher, this.Category]);
  }
}
