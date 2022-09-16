import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb : FormBuilder, private authservice : AuthService, private router :Router) {
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
      console.log("Login successful");
      this.router.navigate(["/"])
    }
    else{
      console.log("User id or password is wrong")
    }
  }

  get email (){
    return this.loginForm.get("email") as FormControl;
  }
  get password(){
    return this.loginForm.get("password") as FormControl;
  }

}
