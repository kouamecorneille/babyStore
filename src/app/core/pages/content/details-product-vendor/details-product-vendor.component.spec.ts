import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProductVendorComponent } from './details-product-vendor.component';

describe('DetailsProductComponent', () => {
  let component: DetailsProductVendorComponent;
  let fixture: ComponentFixture<DetailsProductVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProductVendorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProductVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
