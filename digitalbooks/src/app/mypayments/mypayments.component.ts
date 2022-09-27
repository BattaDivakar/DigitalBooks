import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReaderService } from '../services/reader.service';

@Component({
  selector: 'app-mypayments',
  templateUrl: './mypayments.component.html',
  styleUrls: ['./mypayments.component.css']
})
export class MypaymentsComponent implements OnInit {
payments : any;
  constructor(private readerservice : ReaderService, private authservice : AuthService) { }

  ngOnInit(): void {
    this.readerservice.MyPayments(this.authservice.getCurrentUserid()).subscribe(res => {
      this.payments = res;
   });
  }

}
