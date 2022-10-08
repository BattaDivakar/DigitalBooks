import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserData } from "../models/usermodel";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
  _loginUrl= environment.baseUrl+"login/login";
  _signUpUrl= environment.baseUrl+"login/signup";
  _usersUrl= environment.baseUrl+"login";

  constructor(private http:HttpClient, private jwt: JwtHelperService){}

    authUser(user: any)
    {
      let userArray= [];
      if(localStorage.getItem('Users'))
      {
        userArray = JSON.parse(localStorage.getItem('Users')|| "{}");
      }
      return userArray.find((x: any)=>x.email == user.email && x.password == user.password);
    }

    loginUser(user:any){
      return this.http.post<any>(this._loginUrl, user);
    }
    signupUser(user: any){
      return this.http.post<any>(this._signUpUrl, user);
    }
    users(){
       return this.http.get(this._usersUrl);
    }
    getToken(){
      return localStorage.getItem('token');
    }
    getCurrentUserid(): number{
       return Number(this.jwt.decodeToken(this.getToken()?.toString())?.unique_name);
    }
    getroleid(): number{
      return Number(this.jwt.decodeToken(this.getToken()?.toString())?.role);
   }
   
}