import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionBddService } from '../connection-bdd.service';
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
  data: any = [];
  allUsers: any = [];
  loginStatus: boolean = false;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private connectionBdd: ConnectionBddService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,18}$'
        ),
      ]),
    });
  }

  ngOnInit(): void {
    this.getUsers();
    //console.log('Le mail du user est: ', this.loginForm.email);
    /*     this.connectionBdd.addNewUser('007', 'chacha@hotmail', 'Chacha31!');
    const ref = this.db.list('items');
    ref.valueChanges().subscribe((data) => {
      this.data = data;
    }); */
  }

  onSubmit() {
    /*     if (!this.loginForm.valid) {
      return;
    }
    this.checkLogin(); */
    /*  this.router.navigate(['/']); */
  }

  checkLogin() {
    try {
      this.allUsers.forEach((user: { password: any; email: any }) => {
        if (
          user.password === this.loginForm.password &&
          user.email === this.loginForm.email
        ) {
          const userStorage = [{ email: user.password, password: user.email }];

          localStorage.setItem('loginFormUsers', JSON.stringify(userStorage));
          this.connectionBdd.updateLoginForm(this.loginForm);
          this.loginStatus = true;
          this.router.navigate(['/']);

          throw this.BreakError;
        } else {
          this.readMessageError = true;
          document.getElementById('msg')!.innerHTML = this.messageError;

          // On l'efface 2 secondes plus tard
          //pb de undifined une fois sur home alors que je ne passe pas dedans
          //la variable est certainement plus dispo car on arrive sur home alors que cette dernière va se désactiver 2 sec après
          //voir word angular
          /*           setTimeout(() => {
            document.getElementById('msg')!.innerHTML = '';
          }, 0); */
        }
      });
    } catch (err) {
      if (err !== this.BreakError) throw err;
    }
  }

  //souscription à getAllUsers
  getUsers() {
    this.connectionBdd.getAllUsers().subscribe((users) => {
      this.allUsers = users;
      console.log('List des users: ', this.allUsers);
    });
  }

  backHome() {
    this.router.navigate(['/']);
  }
}
