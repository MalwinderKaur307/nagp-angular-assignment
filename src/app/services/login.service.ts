import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginAsAdmin(username:string,password:string){
    if(username=="Admin" && password=="Admin"){
      return true;
    }
    return false;
  }
}
