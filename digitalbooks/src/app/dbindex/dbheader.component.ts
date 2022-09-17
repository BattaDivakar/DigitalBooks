import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dbheader',
  templateUrl: './dbheader.component.html',
  styleUrls: ['./dbheader.component.css']
})
export class DBHeaderComponent implements OnInit {

  constructor( private toast: NgToastService) { }

  ngOnInit(): void {
  }

  loggedIn()
  {
    return localStorage.getItem("token");
  }

   onLogout()
   {
    localStorage.removeItem("token");
    this.toast.success({detail:"Success Message", summary: "You have been signoff successful."})
   }

}