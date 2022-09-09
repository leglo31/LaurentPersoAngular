import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionBddService } from '../connection-bdd.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  allUsers: any = [];

  constructor(
    private connectionBdd: ConnectionBddService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getUsers() {
    this.connectionBdd.getAllUsers().subscribe((users) => {
      this.allUsers = users;
      console.log('List des users: ', this.allUsers);
    });
    this.router.navigate(['/users']);
  }
}
