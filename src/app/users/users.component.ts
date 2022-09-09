import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionBddService } from '../connection-bdd.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  allUsers: any = [];
  public userEmails = [];
  constructor(
    private connectionBdd: ConnectionBddService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.connectionBdd.getAllUsers().subscribe((users) => {
      this.allUsers = users;
      this.userEmails = this.allUsers.map((user: any) => user.email);
      console.log(this.userEmails);

      // this.allUsers.forEach((user: { password: any; email: any }) => {

      // });
      console.log('List des users de user.component: ', this.allUsers);
    });
  }

  backHome() {
    this.router.navigate(['/']);
  }
}
