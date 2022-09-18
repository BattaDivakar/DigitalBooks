import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managebook',
  templateUrl: './managebook.component.html',
  styleUrls: ['./managebook.component.css']
})
export class ManagebookComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
   
  backtoAuthorBookList()
  {
    this.router.navigate(['/author'])
  }
  
}
