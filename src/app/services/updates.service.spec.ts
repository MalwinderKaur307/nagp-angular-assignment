import { TestBed } from '@angular/core/testing';

import { UpdatesService } from './updates.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

describe('UpdatesService', () => {
  let service: UpdatesService;
  const mockData={
    id:1,
    postedBy:"Admin",
    postedOn:"MM/dd/yyyy",
    postedInfo:"test",
   title:"test",
   description:"test"
 }
  const httpClientStub={
      get: jasmine.createSpy('get').and.returnValue(of(mockData)),
    };   
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
                {provide:HttpClient,useValue:httpClientStub},
                HttpHandler] 
    });
    service = TestBed.inject(UpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get Updates', () => {
    service.getUpdates().subscribe((r)=>{
      expect(r).toEqual(mockData);
    })
  });
});
