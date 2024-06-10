import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesPropulairesComponent } from './articles-propulaires.component';

describe('ArticlesPropulairesComponent', () => {
  let component: ArticlesPropulairesComponent;
  let fixture: ComponentFixture<ArticlesPropulairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesPropulairesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticlesPropulairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
