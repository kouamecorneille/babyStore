import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVendorComponent } from './details-vendor.component';

describe('DetailsVendorComponent', () => {
  let component: DetailsVendorComponent;
  let fixture: ComponentFixture<DetailsVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsVendorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
