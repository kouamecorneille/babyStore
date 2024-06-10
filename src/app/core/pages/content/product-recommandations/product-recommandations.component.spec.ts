import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRecommandationsComponent } from './product-recommandations.component';

describe('ProductRecommandationsComponent', () => {
  let component: ProductRecommandationsComponent;
  let fixture: ComponentFixture<ProductRecommandationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRecommandationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRecommandationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
