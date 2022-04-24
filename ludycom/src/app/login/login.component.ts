import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: any = FormGroup;
  loginForm: any = FormGroup;
  regSubmitted = false;
  logSubmitted = false;
  register: boolean = false;
  authorization: any = localStorage.getItem('auth');
  constructor(private formBuilder: FormBuilder, private router: Router) {
    console.log(this.authorization, 'at')
    if (!!this.authorization && this.authorization === true) {
      this.router.navigate(['/register'])
    } else {
      this.router.navigate(['/'])
    }
  }

  //Form Validables 

  get log() { return this.loginForm.controls; }

  onSubmitLogin() {
    let nwString = localStorage.getItem('user')
    let nwArr = JSON.parse(String(nwString))
    const target = nwArr.filter((e: { email: any; pass: any; }) => e.email === this.log.email.value && e.pass === this.log.password.value)
   console.log(target)
    this.logSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.logSubmitted) {
      if (Array.isArray(target) && target.length > 0) {
        this.router.navigate(['/register'])
        localStorage.setItem('auth', JSON.stringify(true));
      }

    }

  }
  get reg() { return this.registerForm.controls; }
  onSubmitRegister() {
    console.log(this.reg, 'ddd')
    let nwString = localStorage.getItem('user')
    let nwArr = localStorage.getItem('user')
    let infoData =
    {
      token: "23213213231",
      name: this.reg.name.value,
      email: this.reg.emailregister.value,
      surname: this.reg.surname.value,
      docnumber: this.reg.docnumber.value,
      area: this.reg.area.value,
      pass: this.reg.pass.value,
    }

    if (!!nwString && nwString.length > 0) {
      nwArr = JSON.parse(nwString)
    }
    this.regSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.regSubmitted) {
      if (Array.isArray(nwArr)) {
        nwArr.push(infoData)
        localStorage.setItem('user', JSON.stringify(nwArr));
      } else {
        localStorage.setItem('user', JSON.stringify([infoData]));
      }
    }

  }
  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      emailregister: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      datebirth: ['', [Validators.required]],
      docnumber: ['', [Validators.required]],
      area: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  formRegister() {
    if (this.register) {
      this.register = false
    } else {
      this.register = true
    }
  }
}