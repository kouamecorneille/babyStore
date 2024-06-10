import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWishlistComponent } from './shop-wishlist.component';

describe('ShopWishlistComponent', () => {
  let component: ShopWishlistComponent;
  let fixture: ComponentFixture<ShopWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopWishlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
