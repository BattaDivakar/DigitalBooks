import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientModule} from "@angular/common/http";
import { AuthService } from '../services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let validUser = { email: "divakar.batta@gmail.com", password:"123456"};
  let blankUser = { email: "", password: ""}; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
     providers: [ {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  function updateForm(userEmail:any, userPassword :any) {
    component.loginForm.controls['email'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });
   it('form value should update from when u change the input', (() => {
    updateForm(validUser.email, validUser.password);
    expect(component.loginForm.value).toEqual(component.TestUserFormdata());
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm(blankUser.email, blankUser.password);
    expect(component.loginForm.invalid).toBeTruthy();
  }));

  it('created a form with email and password input and login button', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password');
    const emailContainer = fixture.debugElement.nativeElement.querySelector('#email');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn');
    expect(passwordContainer).toBeDefined();
    expect(emailContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

    it('Display disabled login button when email is blank', () => {
    updateForm(blankUser.email, validUser.password);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    expect(component.loginForm.invalid).toBeTruthy();
  });

    it('Display Username Error Msg when Username is blank', () => {
    updateForm(validUser.email, blankUser.password);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

​    expect(component.loginForm.invalid).toBeTruthy();
  });

});
