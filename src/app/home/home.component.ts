import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //loginForm: FormGroup | any;

  constructor(private router: Router, private login: LoginComponent) {
    console.log('Le loginForm de Home est: ', this.login.loginForm.value);
  }

  ngOnInit(): void {}

  routInscription() {
    this.router.navigate(['/registration']);
  }

  routConnection() {
    this.router.navigate(['/login']);
  }
}
