import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieWithFilterComponent } from './categorie-with-filter.component';

describe('CategorieWithFilterComponent', () => {
  let component: CategorieWithFilterComponent;
  let fixture: ComponentFixture<CategorieWithFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieWithFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
