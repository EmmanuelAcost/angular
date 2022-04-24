import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  authorization: any = localStorage.getItem('auth');

  constructor(private router: Router) {
    if (!!this.authorization && this.authorization === true) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.setItem('auth', JSON.stringify(false));
    this.router.navigate(['/'])
  }
}