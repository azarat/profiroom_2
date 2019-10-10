import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorieComponent } from './subcategorie.component';

describe('SubcategorieComponent', () => {
  let component: SubcategorieComponent;
  let fixture: ComponentFixture<SubcategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
