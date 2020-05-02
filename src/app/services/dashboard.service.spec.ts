import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DashboardService', () => {
  let service: DashboardService;
  const mockData = 
        {
          "statewise": [
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
  const httpClientStub={
      get: jasmine.createSpy('get').and.returnValue(of(mockData)),
    };     

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[DashboardService,
                {provide:HttpClient,useValue:httpClientStub},
                HttpHandler] 
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get method of service',()=>{
    service.getDashboardStateData().subscribe((result)=>{
      expect(result).toEqual(mockData);
    })
  })

});
