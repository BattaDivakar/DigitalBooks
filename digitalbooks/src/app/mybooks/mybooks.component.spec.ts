import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

import { MybooksComponent } from './mybooks.component';

describe('MybooksComponent', () => {
  let component: MybooksComponent;
  let fixture: ComponentFixture<MybooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MybooksComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [AuthService, {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MybooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
