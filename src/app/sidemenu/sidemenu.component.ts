import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  loggedIn:boolean=false;
  
  constructor(private router: Router) { 
    var isLoggedIn=localStorage.getItem("loggedAsAdmin");
    if(isLoggedIn=="true"){
      this.loggedIn=true
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      (event) => {
             if (event instanceof NavigationEnd) {
              var isLoggedIn=localStorage.getItem("loggedAsAdmin");
              if(isLoggedIn=="true"){
                this.loggedIn=true
              }
             }
      });
  }

  logOut(){
    localStorage.setItem("loggedAsAdmin","");
    this.loggedIn=false;
    this.router.navigate(['/dashboard']);
  }
}
