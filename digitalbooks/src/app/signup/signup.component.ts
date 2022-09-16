import { NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from './signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerationForm: any;
  user: user = new user();
  userSubmitted: boolean = false;
  // registerationForm :  FormGroup = New FormGroup();
  constructor() {
    
   }

  ngOnInit(): void {
    this.registerationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void{
    this.userSubmitted = true;
    console.log(this.registerationForm.value);
    if(this.registerationForm.valid)
    {
      // this.user = Object.assign(this.user, this.registerationForm.value);
      this.addUser(this.userData());
      this.registerationForm.reset();
      this.userSubmitted =false;
    }
  }
  userData() {
    return this.user = {
      userName : this.userName.value,
      email : this.email.value,
      password : this.password.value 
    }
  }

  addUser(user:user){
    let users = [];
    if(localStorage.getItem("Users"))
    {
      users = JSON.parse(localStorage.getItem("Users") || '{}');
      users = [user,...users];
    }
    else{
      users = [user]
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

  get userName(){
      return this.registerationForm.get("userName") as FormControl;
  }
  get email(){
      return this.registerationForm.get("email") as FormControl;
  }
  get password(){
    return this.registerationForm.get("password") as FormControl;
  }



}
