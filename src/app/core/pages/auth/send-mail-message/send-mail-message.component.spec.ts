import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailMessageComponent } from './send-mail-message.component';

describe('ForgotPasswordComponent', () => {
  let component: SendMailMessageComponent;
  let fixture: ComponentFixture<SendMailMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMailMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMailMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
