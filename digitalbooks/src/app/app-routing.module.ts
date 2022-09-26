import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BooklistComponent } from './booklist/booklist.component';
import { LoginComponent } from './login/login.component';
import { ManagebookComponent } from './managebook/managebook.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"singup", component: SignupComponent},
  {path:'booklist', component: BooklistComponent},
  {path:'', component:SearchbooksComponent},
  {path:'author', component:AuthorComponent},
  {path:'author/managebook', component:ManagebookComponent},
  {path:'book', component:BookdetailsComponent},
  {path:'author/managebook/:id', component:ManagebookComponent},
  {path:'booklist/:Author/:Title/:Publisher/:Category', component:BooklistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
