import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ConnectionBddService } from './connection-bdd.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LaurentPersoAngular';
  allUsers: any;

  constructor(
    private db: AngularFireDatabase,
    private connectionBdd: ConnectionBddService
  ) {}

  data: any = [];

  ngOnInit(): void {
    const ref = this.db.list('items');
    ref.valueChanges().subscribe((data) => {
      this.data = data;
    });
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
}
