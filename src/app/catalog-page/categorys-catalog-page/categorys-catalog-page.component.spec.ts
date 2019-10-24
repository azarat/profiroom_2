import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysCatalogPageComponent } from './categorys-catalog-page.component';

describe('CategoriesCatalogComponent', () => {
  let component: CategorysCatalogPageComponent;
  let fixture: ComponentFixture<CategorysCatalogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorysCatalogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorysCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
