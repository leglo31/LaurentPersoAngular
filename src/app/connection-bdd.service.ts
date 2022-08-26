import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionBddService {
  constructor(private db: AngularFirestore) {}
  allUsers: any = [];

  //Recherche la collection Users avec les id
  //Ensuite, cette fonction sera utilsée pour être souscrite
  getAllUsers() {
    return this.db.collection('Users').valueChanges({ idField: 'id' });
  }

  addNewUser(_newId: any, _fName: string, _lName: string) {
    this.db
      .collection('Users')
      .doc(_newId)
      .set({ email: _fName, password: _lName });
  }

  public borrowerChanged: ReplaySubject<FormGroup | any> = new ReplaySubject<
    FormGroup | any
  >();

  //event handler
  updateLoginForm(loginForm: FormGroup | any): void {
    this.borrowerChanged.next(loginForm);
  }

  getLoginForm(): Observable<FormGroup | any> {
    console.log(this.borrowerChanged);
    return this.borrowerChanged;
  }
}
