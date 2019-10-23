import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCatalogComponent } from './categories-catalog.component';

describe('CategoriesCatalogComponent', () => {
  let component: CategoriesCatalogComponent;
  let fixture: ComponentFixture<CategoriesCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
