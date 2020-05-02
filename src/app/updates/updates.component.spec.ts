import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesComponent } from './updates.component';
import { DatePipe } from '@angular/common';
import { UpdatesService } from '../services/updates.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('UpdatesComponent', () => {
  let component: UpdatesComponent;
  let fixture: ComponentFixture<UpdatesComponent>;
  const mockData={
    id:1,
    postedBy:"Admin",
    postedOn:"MM/dd/yyyy",
    postedInfo:"test",
   title:"test",
   description:"test"
 }
 const updateServiceStub={
  getUpdates: jasmine.createSpy('getUpdates').and.returnValue(of([mockData])),
  }; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesComponent ],
      providers:[{provide:UpdatesService,useValue:updateServiceStub},
        FormBuilder,DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.updatedInfo=[];
    expect(component).toBeTruthy();
  });

  it('should add data to array', () => {
    component.updatedInfo=[];
    component.updateForm.controls['summary'].setValue("hgjgfshd");
    component.updateForm.controls['title'].setValue("hgjgfshd");
    component.updateForm.controls['description'].setValue("hgjgfshd");
    component.addUpdate();
    expect(component.updatedInfo.length).toEqual(1);
  });
});
