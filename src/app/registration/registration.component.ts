import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionBddService } from '../connection-bdd.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  loginForm: FormGroup | any;
  messageError: string = 'Unknown user!';
  readMessageError: boolean = false;
  BreakError = {};
  data: any = [];
  allUsers: any = [];

  users = [
    { email: 'leglo@hotmail.fr', password: 'Laurent31!' },
    {
      email: 'totino@hotmail.fr',
      password: 'Totino31!',
    },
  ];

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
    /* this.getUsers(); */
    /*     this.connectionBdd.addNewUser('007', 'chacha@hotmail', 'Chacha31!');
    const ref = this.db.list('items');
    ref.valueChanges().subscribe((data) => {
      this.data = data;
    }); */
  }

  saveData(inputValue: string) {
    const ref = this.db.list('items');
    //create a database reference to "items" node.
    //if node present, it is automatically created for you

    ref
      .push(inputValue)
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.router.navigate(['/login']);
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
