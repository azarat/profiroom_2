import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCatalogPageComponent } from './categories-catalog-page.component';

describe('CategoriesCatalogComponent', () => {
  let component: CategoriesCatalogPageComponent;
  let fixture: ComponentFixture<CategoriesCatalogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCatalogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
