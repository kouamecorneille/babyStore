import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPerCategoryComponent } from './product-per-category-vendor.component';

describe('ProductPerCategoryComponent', () => {
  let component: ProductPerCategoryComponent;
  let fixture: ComponentFixture<ProductPerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPerCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
