import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientModule} from "@angular/common/http";
import { AuthService } from '../services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let validUser = { userName : "divakar", email: "divakar.batta@gmail.com", password:"123456"};
  let blankUser = {userName: "", email: "", password: ""}; 
//   const authServiceSpy = jasmine.createSpyObj('AuthService', ['singupUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
     providers: [ {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  function updateForm(username: any,  userEmail:any, userPassword :any) {
    component.registerationForm.controls['userName'].setValue(username);
    component.registerationForm.controls['email'].setValue(userEmail);
    component.registerationForm.controls['password'].setValue(userPassword);
  }


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.userSubmitted).toBeFalsy();
    expect(component.registerationForm).toBeDefined();
    expect(component.registerationForm.invalid).toBeTruthy();
  });
  //  it('form value should update from when u change the input', (() => {
  //   updateForm(validUser.userName,validUser.email, validUser.password);
  //   expect(component.registerationForm.value).toEqual(component.userData());
  // }));
  it('Form invalid should be true when form is invalid', (() => {
    updateForm(blankUser.userName, blankUser.email, blankUser.password);
    expect(component.registerationForm.invalid).toBeTruthy();
  }));

  it('created a form with username, email and password input and sign up button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#userName');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password');
    const emailContainer = fixture.debugElement.nativeElement.querySelector('#email');
    const singupBtnContainer = fixture.debugElement.nativeElement.querySelector('#singup-btn');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(emailContainer).toBeDefined();
    expect(singupBtnContainer).toBeDefined();
  });

  it('Display Username Error Msg when Username is blank', () => {
    updateForm(blankUser.userName, validUser.email, validUser.password);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please provide user name');
  });

  it('Display Email Error Msg when email is blank', () => {
    updateForm(validUser.userName, blankUser.email, validUser.password);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const emailErrorMsg = fixture.debugElement.nativeElement.querySelector('#email-error-msg');
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Please provide email id');
  });
  it('Display Password Error Msg when password is blank', () => {
    updateForm(validUser.userName, validUser.email, blankUser.password);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please provide password');
  });

  it('Display user name, email and password Error Msg when form is blank', () => {
    updateForm(blankUser.userName, blankUser.email, blankUser.password);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    ​const emailErrorMsg = fixture.debugElement.nativeElement.querySelector('#email-error-msg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Please provide user name');
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('Please provide email id');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Please provide password');
  });

//   it('authService singupUser() should called ', fakeAsync(() => {
//     updateForm(validUser.userName, validUser.email, validUser.password);
//     fixture.detectChanges();
//     const button = fixture.debugElement.nativeElement.querySelector('button');
//     button.click();
//     fixture.detectChanges();
// ​
//     expect(authServiceSpy.singupUser).toHaveBeenCalled();
//   }));

});
