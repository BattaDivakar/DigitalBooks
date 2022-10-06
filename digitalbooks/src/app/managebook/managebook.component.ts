import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { Book } from '../models/bookmodel';
import { BookService } from '../services/book.service';
import { environment } from 'src/environments/environment';

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
  newfilepath : any;
  currentUserid: number = 0;
  book: Book = new Book();
  bookId: number = 0;
  oldfilePath :any;

  constructor(private router: Router, private fb:FormBuilder, private toast: NgToastService, private jwt: JwtHelperService,
     private _auth: AuthService, private _bookservice: BookService, private route : ActivatedRoute) { 
    this.bookForm = fb.group({})
  }

  ngOnInit(): void {
    this.currentUserid = this._auth.getCurrentUserid();
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

    let sub = this.route.params.subscribe(params =>{
      if(params['id']){
        this.bookId = Number(atob(params['id']));
      }
    });

   if(this.bookId > 0)
   {
    this._bookservice.getupdatebook(this.bookId)
    .subscribe((res:any) => {
      this.bookForm = new FormGroup({
        title: new FormControl(res.book.title, Validators.required),
        category : new FormControl(res.book.category, [Validators.required]),
        price : new FormControl(res.book.price, [Validators.required]),
        content: new FormControl(res.book.content, Validators.required),
        publisher : new FormControl(res.book.publisher, [Validators.required]),
        publisherDate : new FormControl(this.Convertdateformat(new Date(res.book.publisherDate)), [Validators.required]),
        chapters : new FormControl(res.book.chapters, [Validators.required]),
        logo : new FormControl(res.book.filePath, [Validators.required]),
        active : new FormControl(res.book.active, [Validators.required])
      });
      this.url = environment.imageUrl+res.book.filePath;
      this.oldfilePath = res.book.filePath;
    },
     res => console.log(res));
  }
   
  }
 

  onSubmit(): void{
    this.bookSubmitted = true;
    if(this.bookForm.valid)
    {
      if(this.file)
      {
        const formData=new FormData();
        formData.append('file', this.file, this.file.name);
        this._bookservice.uploadImage(formData)
        .subscribe(res=>
          {
            this.newfilepath = res.dbPath
            if(this.bookId > 0)
            {
              this.editbook()
            }
            else{
              console.log(this.bookData())
              this.addbook()
            }
          },
          res=>console.log(res)
          );
      }
      else{
        this.editbook();
      }
    }
  }
 
  addbook(){
    // this.newfilepath = dbfilepath;
    this._bookservice.addBook(this.bookData()).subscribe(res=>{
        this.toast.success({detail: "Success Message", summary: "Book has been added successfully.", duration: 5000})
        this.bookForm.reset();
        this.bookSubmitted = false;
        this.backtoAuthorBookList()
      },res=>console.log(res));
  }

  editbook()
  {
    // this.newfilepath = dbfilepath;
    this._bookservice.editBook(this.bookId, this.bookData()).subscribe(res=>{
      this.toast.success({detail: "Success Message", summary: "Book has been updated successfully.", duration: 5000})
      this.bookForm.reset();
      this.bookSubmitted = false;
      this.backtoAuthorBookList()
    },res=>console.log(res));

  }

  bookData() {
    return this.book = {
      id: this.bookId,
      authorId : this.currentUserid,
      title : this.title.value,
      category : this.category.value,
      price : Number(this.price.value),
      content : this.content.value,
      publisher : this.publisher.value,
      publisherDate : this.publisherDate.value,
      chapters :this.chapters.value,
      filePath : this.getFilePath(),
      active: this.active.value,
    }
  }


  
  
  


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
      reader.onload=(event:any) =>{ this.url = event.target.result;}
      this.file = e.target.files[0];
      this.bookForm.controls['logo'].setValue(e.target.files[0].name);
    }
    else{
      this.url = "";
      this.bookForm.controls['logo'].setValue("");
    }
  }

  Convertdateformat(date :Date) :string{
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
  }

  getFilePath() : string{
    if(this.newfilepath)
    {
     return this.newfilepath;
    }
    else{
      return this.oldfilePath
    }
  }
   
  backtoAuthorBookList()
  {
    this.router.navigate(['/author'])
  }
  
}
