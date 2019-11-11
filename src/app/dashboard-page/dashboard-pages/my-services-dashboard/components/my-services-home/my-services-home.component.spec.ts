import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyServicesHomeComponent } from './my-services-home.component';



describe('MyServicesDashboardComponent', () => {
  let component: MyServicesHomeComponent;
  let fixture: ComponentFixture<MyServicesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyServicesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServicesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
