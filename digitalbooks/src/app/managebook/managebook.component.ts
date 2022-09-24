import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { Book } from '../models/bookmodel';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-managebook',
  templateUrl: './managebook.component.html',
  styleUrls: ['./managebook.component.css']
})
export class ManagebookComponent implements OnInit {
  bookForm: FormGroup;
  bookSubmitted: boolean = false;
  url :any;
  file: any;
  dbfilepath : any;
  currentUserid: number = 0;
  book: Book = new Book();
  // const formData=new FormData();

  constructor(private router: Router, private fb:FormBuilder, private toast: NgToastService, private jwt: JwtHelperService,
     private _auth: AuthService, private _bookservice: BookService, private cd :ChangeDetectorRef) { 
    this.bookForm = fb.group({})
  }

  ngOnInit(): void {
    this.currentUserid = Number(this.jwt.decodeToken(this._auth.getToken()?.toString()).unique_name);
    this.bookForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      category : new FormControl(null, [Validators.required]),
      price : new FormControl(null, [Validators.required]),
      content: new FormControl(null, Validators.required),
      publisher : new FormControl(null, [Validators.required]),
      publisherDate : new FormControl(null, [Validators.required]),
      chapters : new FormControl(null, [Validators.required]),
      logo : new FormControl(null, [Validators.required]),
      active : new FormControl(true, [Validators.required])
    });
  }


  onSubmit(): void{
    console.log(this.bookForm.value);
    console.log(this.file);
    this.bookSubmitted = true;
   
    if(this.bookForm.valid)
    {
      const formData=new FormData();
      formData.append('file', this.file, this.file.name);
      this._bookservice.uploadImage(formData).subscribe(res=>this.savebook(res.dbPath),res=>console.log(res));
      
      
   
    }
  }
  savebook(dbfilepath :any){
    this.dbfilepath = dbfilepath;
    this._bookservice.saveBook(this.bookData()).subscribe(res=>{
        this.toast.success({detail: "Success Message", summary: "Book has been added successfully.", duration: 5000})
        this.bookForm.reset();
        this.bookSubmitted = false;
      },res=>console.log(res));
  }

  bookData() {
    return this.book = {
      id: 0,
      authorId : this.currentUserid,
      title : this.title.value,
      category : this.category.value,
      price : Number(this.price.value),
      content : this.content.value,
      publisher : this.publisher.value,
      publisherDate : this.publisherDate.value,
      chapters :this.chapters.value,
      filePath : this.dbfilepath,
      active: this.active.value,
    }
  }


  // setData(){
  //   this.formData.append('authorId',this.currentUserid)
  // }
  
  


  get title(){ return this.bookForm.get("title") as FormControl;}
  get category(){ return this.bookForm.get("category") as FormControl;}
  get price(){ return this.bookForm.get("price") as FormControl;}
  get content(){ return this.bookForm.get("content") as FormControl;}
  get publisher(){ return this.bookForm.get("publisher") as FormControl;}
  get publisherDate(){ return this.bookForm.get("publisherDate") as FormControl;}
  get chapters(){ return this.bookForm.get("chapters") as FormControl;}
  get logo(){ return this.bookForm.get("logo") as FormControl;}
  get active(){ return this.bookForm.get("active") as FormControl;}

  onSelectFile(e :any){
  if(e.target.files.length)
  {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any) =>{
        this.url = event.target.result;
    }
    this.file = e.target.files[0];
    
  }
  else{
    this.url = "";
  }
  }

   
  backtoAuthorBookList()
  {
    this.router.navigate(['/author'])
  }
  
}
