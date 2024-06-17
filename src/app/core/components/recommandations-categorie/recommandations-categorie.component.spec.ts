import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandationsCategorieComponent } from './recommandations-categorie.component';

describe('RecommandationsCategorieComponent', () => {
  let component: RecommandationsCategorieComponent;
  let fixture: ComponentFixture<RecommandationsCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommandationsCategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommandationsCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
