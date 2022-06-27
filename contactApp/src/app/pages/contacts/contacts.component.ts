import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/database';
import { ContactModel } from './../../model/Contact';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  // to hold contacts which are fetched from the firebase
  contacts: ContactModel[] = [];

  // to show/hide spinner
  isLoading = false;

  constructor(db: AngularFireDatabase, private toastr: ToastrService) {
    // showing spinner to UI
    this.isLoading = true;
    db.object('/contacts')
      .valueChanges()
      .subscribe((obj) => {
        // fetching contacts as object. If no contact is there then its null.
        // taking the values out from the contact object and setting in the array
        if (obj) {
          this.contacts = Object.values(obj);
          this.isLoading = false;
        } else {
          // if their is no contacts.
          toastr.error('NO contacts found');
          this.contacts = [];
          this.isLoading = false;
        }
      });
  }

  ngOnInit(): void {}
}
