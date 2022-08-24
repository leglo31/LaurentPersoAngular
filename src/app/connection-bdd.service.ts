import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ConnectionBddService {
  constructor(private db: AngularFirestore) {}

  getAllUsers() {
    return this.db.collection('Users').valueChanges({ idField: 'id' });
  }

  addNewUser(_newId: any, _fName: string, _lName: string) {
    this.db
      .collection('Users')
      .doc(_newId)
      .set({ email: _fName, password: _lName });
  }
}
