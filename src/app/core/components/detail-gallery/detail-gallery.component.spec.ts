import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGalleryComponent } from './detail-gallery.component';

describe('DetailGalleryComponent', () => {
  let component: DetailGalleryComponent;
  let fixture: ComponentFixture<DetailGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
