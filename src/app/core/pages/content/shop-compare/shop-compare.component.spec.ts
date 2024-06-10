import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCompareComponent } from './shop-compare.component';

describe('ShopCompareComponent', () => {
  let component: ShopCompareComponent;
  let fixture: ComponentFixture<ShopCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCompareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
