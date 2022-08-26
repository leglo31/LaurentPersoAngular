import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionBddService } from '../connection-bdd.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public email: string = 'ooo';
  loginFormHtml: FormGroup | any;

  constructor(
    private router: Router,
    private connectionBdd: ConnectionBddService
  ) {}

  ngOnInit(): void {
    this.connectionBdd
      .getLoginForm()
      .subscribe((loginForm: FormGroup | any) => {
        console.log('loginForm: ', loginForm);
        /* this.email = loginForm.email.value; */
        console.log('email: ', loginForm.email);
        this.email = loginForm.email;
      });
  }

  routInscription() {
    this.router.navigate(['/registration']);
  }

  routConnection() {
    this.router.navigate(['/login']);
  }
}
