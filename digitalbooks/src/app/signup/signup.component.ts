import { NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private fb:FormBuilder) {
     this.registerationForm = fb.group({});
   }

  ngOnInit(): void {
    this.registerationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  // emailvalidatior(fg: FormGroup) : Validators {
  //   // let userArray= [];
  //   // if(localStorage.getItem('Users'))
  //   // {
  //   //   userArray = JSON.parse(localStorage.getItem('Users')|| "{}");
  //   // }
  //   // return 'a' == 'a' ? null : {nottouched: true};
    
  // }

  

  onSubmit(): void{
    this.userSubmitted = true;
    console.log(this.registerationForm.value);
    if(this.registerationForm.valid)
    {
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
