import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dbheader',
  templateUrl: './dbheader.component.html',
  styleUrls: ['./dbheader.component.css']
})
export class DBHeaderComponent implements OnInit {

  constructor( private toast: NgToastService, private router: Router) { }

  ngOnInit(): void {
  }

  loggedIn()
  {
    return localStorage.getItem("token");
  }

   onLogout()
   {
    localStorage.removeItem("token");
    this.toast.success({detail:"Success Message", summary: "You have been signed out successfully."});
     this.router.navigate(["/"]);
   }

}