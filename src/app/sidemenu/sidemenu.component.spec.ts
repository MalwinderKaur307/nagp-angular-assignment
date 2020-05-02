import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuComponent } from './sidemenu.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;
  const routerStub = {
    navigate: jasmine.createSpy('navigate'),
    events:of({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidemenuComponent ],
      providers:[{provide:Router,useValue:routerStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.logOut();
    expect(localStorage.getItem("loggedAsAdmin")).toEqual("");
  });
});
