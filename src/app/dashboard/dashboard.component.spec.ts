import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../services/dashboard.service';
import { of } from 'rxjs';
import { DashboardStatewiseDataModel } from '../models/dashboard-statewise-data.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockData= 
        {
          statewise: [
            {
              active :2,
              confirmed :4,
              deaths :1,
              recovered :1,
              state :"Total",
              statecode :"hdsf"
            },
            {
              active :2,
              confirmed :4,
              deaths :1,
              recovered :1,
              state :"sdvnsdf",
              statecode :"hdsf"
            }
          ]
        };

  const dashboardServiceStub={
    getDashboardStateData: jasmine.createSpy('getDashboardStateData').and.returnValue(of(mockData)),
    getDashboarDistrictdData: jasmine.createSpy('getDashboarDistrictdData').and.returnValue(of({}))
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers:[{provide:DashboardService,useValue:dashboardServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.selectedState="Total";
    expect(component).toBeTruthy();
  });

  it('should fetch data', () => {
    component.selectedState="Total";
    component.getDashboardData();
    expect(component.dashboardData.length).toEqual(2);
  });
});
