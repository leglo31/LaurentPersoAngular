import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionBddService } from '../connection-bdd.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public email: string = '';
  loginFormHtml: FormGroup | any;
  isAuth: boolean = false;
  public sentence: string = '';
  message: string = '';

  constructor(
    private router: Router,
    private connectionBdd: ConnectionBddService
  ) {}

  //voir token Auth plus tard
  ngOnInit(): void {
    this.connectionBdd
      .getLoginForm()
      .subscribe((loginForm: FormGroup | any) => {
        console.log('loginForm: ', loginForm);
        /* this.email = loginForm.email.value; */
        console.log('email: ', loginForm.email);
        this.email = loginForm.email;
        this.isAuth = true;
        this.isConnected();
        // this.routDeconnection();
      });
    this.date();
  }

  isConnected() {
    if (this.isAuth) {
      this.message = "Super vous êtes connecté avec l'adresse:  ";
      this.email;
    }
  }

  routInscription() {
    this.router.navigate(['/registration']);
  }

  routConnection() {
    this.router.navigate(['/login']);
  }

  routDeconnection() {
    this.isAuth = false;
    this.router.navigate(['/']);
  }

  startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = this.checkTime(m);
    document.getElementById('time')!.innerHTML = +today + h + ':' + m;
    var t = setTimeout(this.startTime, 500);
  }

  checkTime(i: number) {
    if (i < 10) {
      i = 0 + i;
    } // add zero in front of numbers < 10
    return i;
  }

  date() {
    var date1 = new Date();

    let dateLocale = date1.toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    document.getElementById('p1')!.innerHTML! = dateLocale;
  }
}
