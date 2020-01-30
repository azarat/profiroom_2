import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinacePageComponent } from './finace-page.component';

describe('FinacePageComponent', () => {
  let component: FinacePageComponent;
  let fixture: ComponentFixture<FinacePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinacePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
