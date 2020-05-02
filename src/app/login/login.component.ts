import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('errorMessage', { static: true }) errorMessage: ElementRef;
  @ViewChild('username', { static: true }) username: ElementRef;
  @ViewChild('password', { static: true }) password: ElementRef;
  constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", Validators.required)
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      let username = this.loginForm.controls['username'].value;
      let password = this.loginForm.controls['password'].value;
      let loginSuccess = this._loginService.loginAsAdmin(username, password);
      if (loginSuccess) {
        localStorage.setItem("loggedAsAdmin", loginSuccess.toString());
        this.router.navigate(['/dashboard']);
      }
    }
      this.showErrorMessage();
  }

  showErrorMessage() {
    this.errorMessage.nativeElement.classList.remove('d-none')
    this.username.nativeElement.classList.add('error')
    this.password.nativeElement.classList.add('error')
  }

}
