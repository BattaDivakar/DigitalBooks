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
  showmybooks()
  {
    return localStorage.getItem("showMybooks");
  }

   onLogout()
   {
    localStorage.removeItem("token");
    localStorage.removeItem("showMybooks");
    this.toast.success({detail:"Success Message", summary: "You have been signed out successfully."});
     this.router.navigate(["/"]);
   }

}