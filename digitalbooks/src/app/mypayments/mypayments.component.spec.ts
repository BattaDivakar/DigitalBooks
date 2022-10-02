import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MypaymentsComponent } from './mypayments.component';
import { HttpClientModule} from "@angular/common/http";
import { AuthService } from '../services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


describe('MypaymentsComponent', () => {
  let component: MypaymentsComponent;
  let fixture: ComponentFixture<MypaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MypaymentsComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [AuthService, {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MypaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
