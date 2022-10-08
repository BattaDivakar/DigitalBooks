import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReaderService } from '../services/reader.service';
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';




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
  generatePDF(payment: any){
    const docDefinition :any = {
      content: [
        {  
          text: 'DIGITAL BOOKS',  
          fontSize: 16,  
          alignment: 'center',  
          color: '#047886', 
        },  
        {  
          text: 'INVOICE',  
          fontSize: 20,  
          bold: true,  
          alignment: 'center',  
          decoration: 'underline',  
          color: 'skyblue', 
          paddingBottom: 40  
        }, 
        {  
          text: `Date: ${new Date().toLocaleString()}`,  
          alignment: 'right'  
        },  
        {
          text:"Payment Details",
        },
        {
          table: {
              headerRows: 1,
              body: [
                  ['Invoice Number', 'Title', 'Date', 'Amount'],
                  [payment.invoiceNumber, payment.title, payment.invoiceDate, payment.amount]
              ]
          }
      }],
  };
    pdfMake.createPdf(docDefinition).download(payment.invoiceNumber); 
  };

}
