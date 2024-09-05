import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsCategoriesComponent } from './vendors-categories.component';

describe('VendorsCategoriesComponent', () => {
  let component: VendorsCategoriesComponent;
  let fixture: ComponentFixture<VendorsCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorsCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
