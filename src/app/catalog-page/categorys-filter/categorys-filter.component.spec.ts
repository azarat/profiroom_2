import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysFilterComponent } from './categorys-filter.component';

describe('CategorysFilterComponent', () => {
  let component: CategorysFilterComponent;
  let fixture: ComponentFixture<CategorysFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorysFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorysFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
