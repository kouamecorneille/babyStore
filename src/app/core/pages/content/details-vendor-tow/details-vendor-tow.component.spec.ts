import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVendorTowComponent } from './details-vendor-tow.component';

describe('DetailsVendorTowComponent', () => {
  let component: DetailsVendorTowComponent;
  let fixture: ComponentFixture<DetailsVendorTowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsVendorTowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsVendorTowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
