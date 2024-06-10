import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerVendorsComponent } from './banner-vendors.component';

describe('BannerVendorsComponent', () => {
  let component: BannerVendorsComponent;
  let fixture: ComponentFixture<BannerVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerVendorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
