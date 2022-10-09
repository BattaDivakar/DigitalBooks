import { JsonPipe, NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserData } from '../models/usermodel';
import { AuthService } from '../services/auth.service';
import { user } from './signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerationForm: FormGroup;
  user: user = new user();
  userSubmitted: boolean = false;
  userModels: any;

  constructor(private fb:FormBuilder, private toast: NgToastService, private router: Router,
    private authservice : AuthService ) {
     this.registerationForm = fb.group({});
   }

  ngOnInit(): void {
    this.authservice.users().subscribe(res=>this.users(res), res=>{console.log(res)});
    this.registerationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      roleId : new FormControl("2")
    });
  }

  onSubmit(): void{
    this.userSubmitted = true;
    if(this.registerationForm.valid)
    {
      if(this.hasEmailExisted(this.email.value, this.role.value))
      {
        this.toast.error({detail:"Error Message", summary: "An email already exists", duration: 5000});
      }
      else
      {
        this.authservice.signupUser(this.userData()).subscribe(res=>{
          this.toast.success({detail: "Success Message", summary: "Account has been created successfully.", duration: 5000})
          this.registerationForm.reset();
          this.userSubmitted = false;
          this.router.navigate(['/login']);
        },res=>console.log(res));
      }
    }
  }

  hasEmailExisted(email: any, role: any) :boolean{
    if(this.userModels){
      if(this.userModels.find((x:any)=> x.email.toUpperCase() === email.toUpperCase()))
      {
        return true;
      }
    }
    return false;
  }

users(input :any){
  this.userModels = input;
}
 
  userData() {
    return this.user = {
      userName : this.userName.value,
      email : this.email.value,
      password : this.password.value,
      roleId : Number(this.role.value)
    }
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
  get role(){
    return this.registerationForm.get("roleId") as FormControl;
  }

}
