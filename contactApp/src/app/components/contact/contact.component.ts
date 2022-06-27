import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/database';
import { ContactModel } from './../../model/Contact';
import { Component, OnInit, Input } from '@angular/core';

// to use fontawesome icons
import { faStar as favorite, faPen } from '@fortawesome/free-solid-svg-icons';
import { faStar, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  // will get contact from Contacts Component
  @Input() contact: ContactModel;

  // to use icons
  faStarHalf = faStar;
  faStar = favorite;
  faPen = faPen;
  faTrashAlt = faTrashAlt;

  constructor(private db: AngularFireDatabase, private toastr: ToastrService) {}

  ngOnInit(): void {}

  // will handle delete the contact from the firebase DB
  deleteContact() {
    // referencing the contact to db and deleting it
    this.db
      .object(`/contacts/${this.contact.id}`)
      .remove()
      .then(() => {
        this.toastr.info('contact deleted');
      })
      .catch((err) => {
        this.toastr.error('something went wrong');
      });
  }

  // will update the favorite of the contact
  // change isFavorite
  updateFavorite() {
    this.db
      .object(`/contacts/${this.contact.id}`)
      .update({
        isFavorite: !this.contact.isFavorite,
      })
      .then(() => {
        this.toastr.info('updated');
      })
      .catch((err) => {
        this.toastr.error('something went wrong');
      });
  }
}
