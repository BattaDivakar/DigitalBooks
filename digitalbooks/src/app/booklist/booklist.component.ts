import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  constructor() { }
  books: any = [
    { Name:"The Subtle Art of Not Giving a F*ck", Photo:"assets/images/subtle.jpg", Price:"318.00", Author:"Manson, Mark"  },
    { Name:"The Monk Who Sold His Ferrari", Photo:"assets/images/Monk.jpg", Price:"318.00", Author:"Sharma, Robin"  },
    { Name:"The Power of Your Subconscious Mind", Photo:"assets/images/power.jpg", Price:"318.00", Author:"Joseph Murphy"  },
    { Name:"Think and Grow Rich", Photo:"assets/images/think.jpg", Price:"318.00", Author:"Napoleon Hill"  },
    { Name:"Who Will Cry When You Die?", Photo:"assets/images/who.jpg", Price:"318.00", Author:"Sharma, Robin"  },
    { Name:"Wings of Fire", Photo:"assets/images/wings.jpg", Price:"318.00", Author:"APJ Abdul Kalam, Arun Tiwari"  },
    { Name:"One Indian Girl", Photo:"assets/images/one.jpg", Price:"318.00", Author:"Chetan Bhagat"  },
    { Name:"The Secret", Photo:"assets/images/secret.jpg", Price:"318.00", Author:"Rhonda Byrne"  }
  ]

  ngOnInit(): void {
  }

}
