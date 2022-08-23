import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  messageError: string = 'Unknown user!';
  readMessageError: boolean = false;
  BreakError = {};

  users = [
    { email: 'leglo@hotmail.fr', password: 'Laurent31!' },
    {
      email: 'totino@hotmail.fr',
      password: 'Totino31!',
    },
  ];

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        ),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    /*     if (!this.loginForm.valid) {
      return;
    }
    localStorage.setItem('user', this.loginForm.value);
    this.router.navigate(['/home']); */
  }

  checkLogin() {
    try {
      this.users.forEach((user) => {
        if (
          user.password === this.loginForm.password &&
          user.email === this.loginForm.email
        ) {
          const userStorage = [{ email: user.password, password: user.email }];

          localStorage.setItem('loginFormUsers', JSON.stringify(userStorage));
          this.router.navigate(['/home']);
          throw this.BreakError;
        } else {
          this.readMessageError = true;
          document.getElementById('msg')!.innerHTML = this.messageError;

          // On l'efface 6 secondes plus tard
          setTimeout(function () {
            document.getElementById('msg')!.innerHTML = '';
          }, 2000);
        }
      });
    } catch (err) {
      if (err !== this.BreakError) throw err;
    }
  }
}
