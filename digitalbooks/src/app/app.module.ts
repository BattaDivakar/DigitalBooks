import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DBHeaderComponent } from './dbindex/dbheader.component';
import { DBIndexComponent } from './dbindex/dbindex.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import { LoginComponent } from './login/login.component';
import { BooklistComponent } from './booklist/booklist.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DBIndexComponent,
    DBHeaderComponent,
    SearchbooksComponent,
    LoginComponent,
    BooklistComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [DBIndexComponent]
})
export class AppModule { }
