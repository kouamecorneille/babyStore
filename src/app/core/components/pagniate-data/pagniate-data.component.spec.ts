import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagniateDataComponent } from './pagniate-data.component';

describe('PagniateDataComponent', () => {
  let component: PagniateDataComponent;
  let fixture: ComponentFixture<PagniateDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagniateDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagniateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
