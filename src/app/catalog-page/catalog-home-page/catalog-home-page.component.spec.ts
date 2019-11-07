import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogHomePageComponent } from './catalog-home-page.component';

describe('CatalogHomeComponent', () => {
  let component: CatalogHomePageComponent;
  let fixture: ComponentFixture<CatalogHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
