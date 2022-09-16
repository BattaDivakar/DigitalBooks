import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooklistComponent } from './booklist/booklist.component';
import { LoginComponent } from './login/login.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"singup", component: SignupComponent},
  {path:'booklist', component: BooklistComponent},
  {path:'', component:SearchbooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
