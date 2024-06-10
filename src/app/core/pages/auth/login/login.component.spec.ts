import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from '../../../services/auth/authenticate.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticateService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule], // Add ReactiveFormsModule for FormBuilder
      providers: [
        { provide: AuthenticateService, useValue: { login: () => of({}) } }, // Mock AuthService
        { provide: ToastrService, useValue: { success: () => {}, error: () => {} } }, // Mock ToastrService
        { provide: Router, useValue: {} } // Mock Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticateService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login when form is valid', () => {
    spyOn(authService, 'login').and.returnValue(of({})); // Spy on login method and return an observable of empty object
    component.LoginForm.controls['numero'].setValue('1234567890');
    component.LoginForm.controls['password'].setValue('password');
    component.login();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should display error message when form is invalid', () => {
    spyOn(toastrService, 'error');
    component.login();
    expect(component.message).toBe('Veuillez remplir tout les chapms du formulaire.');
    expect(toastrService.error).toHaveBeenCalledWith('Veuillez remplir tout les chapms du formulaire.', 'Error');
  });
});
