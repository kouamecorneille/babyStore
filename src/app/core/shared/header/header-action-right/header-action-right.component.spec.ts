import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderActionRightComponent } from './header-action-right.component';

describe('HeaderActionRightComponent', () => {
  let component: HeaderActionRightComponent;
  let fixture: ComponentFixture<HeaderActionRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderActionRightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderActionRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
