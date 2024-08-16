import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRessetConfirmComponent } from './password-resset-confirm.component';

describe('ForgotPasswordComponent', () => {
  let component: PasswordRessetConfirmComponent;
  let fixture: ComponentFixture<PasswordRessetConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordRessetConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRessetConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
