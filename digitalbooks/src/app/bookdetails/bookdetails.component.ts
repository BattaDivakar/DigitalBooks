import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BookDetails } from '../models/bookdetailsmodel';
import { AuthService } from '../services/auth.service';
import { ReaderService } from '../services/reader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  bookId:number = 0
  bookModel: BookDetails = new BookDetails();
  invoiceDTO : any;
  baseimageUrl : string = environment.imageUrl;
  
  constructor(private route: ActivatedRoute, private readerservice : ReaderService, 
    private authservice: AuthService, private toast: NgToastService, private router : Router) {  }

  ngOnInit(): void {
    let sub = this.route.params.subscribe(params =>{
      if(params['id']){
        this.bookId = Number(atob(params['id']));
      }
    });
    this.readerservice.GetBook(this.bookId)
                      .subscribe(res =>this.Bookdetails(res),
                                  res => console.log(res))

  }

  Bookdetails(input: any)
  {
    this.bookModel = input;
  }
  Buybook(bookid: number)
  {
    let id = this.authservice.getCurrentUserid();
    if(id > 0)
    {
      this.invoiceDTO = {
        bookId :bookid,
        readerId : id
      }
      this.readerservice.CreateInvoice(this.invoiceDTO).subscribe(res => {
      localStorage.setItem('showMybooks', "true");
      this.toast.success({ detail: "Success Message", summary: "You have been done payment successfully.", duration: 5000});
      this.router.navigate(["/mybooks"]);
      }, res =>console.log(res))
    }
    else{
      this.toast.info({ detail: "Info Message", summary: "In order to continue, you must sign in.", duration: 8000});
    }
  }

}
