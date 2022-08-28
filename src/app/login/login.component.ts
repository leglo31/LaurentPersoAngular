import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionBddService } from '../connection-bdd.service';
import { EventServiceService } from '../event-service.service';
import { InotifAlert } from '../notification/notification';
import { NotificationComponent } from '../notification/notification.component';
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
  @ViewChild('alertContainer', { read: ViewContainerRef })
  alertContainer!: ViewContainerRef;
  alertList = new Array(0);

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private connectionBdd: ConnectionBddService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private eventService: EventServiceService
  ) {
    this.eventService.observable.subscribe((event) => {
      this.loadNewAlertComponent(event);
    });

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

  createComponent(alertComponent: Type<NotificationComponent>) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(alertComponent);
    return this.alertContainer.createComponent(componentFactory);
  }

  loadNewAlertComponent(event: InotifAlert) {
    const component = this.createComponent(NotificationComponent);
    (component.instance as NotificationComponent).event = event;
    (component.instance as NotificationComponent).eventToDelete.subscribe(
      () => {
        component.destroy();
      }
    );
    component.changeDetectorRef.detectChanges();
    this.alertList[this.alertList.length] = component;
  }

  displayAnAlert() {
    this.eventService.displayAlert(this.messageError, 'error');
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
          this.displayAnAlert();
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
