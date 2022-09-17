import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb : FormBuilder, private authservice : AuthService, 
    private router :Router, private toast: NgToastService) {
    this.loginForm = fb.group({});
   } 

  ngOnInit(): void {
    this.loginForm =  new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
     });
  }

  onSubmit()
  {
    console.log(this.loginForm.value);
    const user = this.authservice.authUser(this.loginForm.value);
    if(user)
    {
      localStorage.setItem("token", user.email);
      this.toast.success({  detail: "Success Message", summary: "Sign in successful", duration: 5000});
      this.router.navigate(["/"])
    }
    else{
      this.toast.error({ detail: "Error Message",  summary:"User id or password is wrong", duration:5000})
    }
  }

  get email (){
    return this.loginForm.get("email") as FormControl;
  }
  get password(){
    return this.loginForm.get("password") as FormControl;
  }

}
