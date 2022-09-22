import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
 book: any = {id: 2,
 title: "The Power of Your Subconscious Mind",
 logo: "assets/images/power.jpg",
 price : "200.00",
 author : "Joseph Murphy",
 category: "General",
 publisher : "General Press",
 publisherDate: "12-04-2016",
 chapters:20,
 active : true,
 email : "robin@gmail.com",
 };

}
