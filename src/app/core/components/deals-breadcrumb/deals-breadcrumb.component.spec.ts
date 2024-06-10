import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsBreadcrumbComponent } from './deals-breadcrumb.component';

describe('DealsBreadcrumbComponent', () => {
  let component: DealsBreadcrumbComponent;
  let fixture: ComponentFixture<DealsBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsBreadcrumbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealsBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
