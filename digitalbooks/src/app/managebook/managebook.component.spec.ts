import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientModule} from "@angular/common/http";
import { AuthService } from '../services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagebookComponent } from './managebook.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('ManagebookComponent', () => {
  let component: ManagebookComponent;
  let fixture: ComponentFixture<ManagebookComponent>;
  let validbook = { title : "divakar", category: "divakar", price:"1234", content: "Divakar", publisher:"Test", publisherDate:"01/03/2022",chapters: "24",logo:"", active: true };
  let blankbook = {title: "", category: "", price: "", content: "", publisher:"", publisherDate:"",chapters: "",logo:"", active: "" }; 


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebookComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
     providers: [ {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.bookForm).toBeDefined();
    expect(component.bookForm.invalid).toBeTruthy();
  });

  it('Form invalid should be true when form is invalid', (() => {
    component.bookForm.controls['title'].setValue(blankbook.title);
    component.bookForm.controls['category'].setValue(blankbook.category);
    component.bookForm.controls['publisher'].setValue(blankbook.publisher);
    expect(component.bookForm.invalid).toBeTruthy();
  }));

  it('created a form with title, category, price, publisher and content input and save button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const titleContainer = fixture.debugElement.nativeElement.querySelector('#title');
    const categoryContainer = fixture.debugElement.nativeElement.querySelector('#category');
    const priceContainer = fixture.debugElement.nativeElement.querySelector('#price');
    const publisherContainer = fixture.debugElement.nativeElement.querySelector('#publisher');
    const contentContainer = fixture.debugElement.nativeElement.querySelector('#content');
    const saveBtnContainer = fixture.debugElement.nativeElement.querySelector('#save-btn');
    expect(titleContainer).toBeDefined();
    expect(categoryContainer).toBeDefined();
    expect(priceContainer).toBeDefined();
    expect(publisherContainer).toBeDefined();
    expect(contentContainer).toBeDefined();
    expect(saveBtnContainer).toBeDefined();
  });

  it('Display title Error Msg when title is blank', () => {
    component.bookForm.controls['title'].setValue(blankbook.title);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#title-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please provide title');
  });

  it('Display category Error Msg when category is blank', () => {
    component.bookForm.controls['category'].setValue(blankbook.category);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const emailErrorMsg = fixture.debugElement.nativeElement.querySelector('#category-error-msg');
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Please provide category');
  });
  it('Display price Error Msg when price is blank', () => {
    component.bookForm.controls['price'].setValue(blankbook.price);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#price-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please provide price');
  });
  it('Display content Error Msg when content is blank', () => {
    component.bookForm.controls['content'].setValue(blankbook.content);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#content-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please provide content');
  });
  it('Display publisher Error Msg when publisher is blank', () => {
    component.bookForm.controls['publisher'].setValue(blankbook.publisher);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#publisher-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please provide publisher');
  });
});
