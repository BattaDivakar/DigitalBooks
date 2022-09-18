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
import { AuthService } from './services/auth.service';
import { NgToastModule } from 'ng-angular-popup';
import { HttpClientModule} from "@angular/common/http";
import { BookService } from './services/book.service';
import { AuthorComponent } from './author/author.component';
import { ManagebookComponent } from './managebook/managebook.component';

@NgModule({
  declarations: [
    AppComponent,
    DBIndexComponent,
    DBHeaderComponent,
    SearchbooksComponent,
    LoginComponent,
    BooklistComponent,
    SignupComponent,
    AuthorComponent,
    ManagebookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    HttpClientModule
  ],
  providers: [AuthService, BookService],
  bootstrap: [DBIndexComponent]
})
export class AppModule { }
