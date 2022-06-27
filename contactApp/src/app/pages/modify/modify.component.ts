import { ContactModel } from './../../model/Contact';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';

// firebase stuffs
import { AngularFireStorage } from '@angular/fire/storage';

// to use finilize
import { finalize } from 'rxjs/operators';

// to compress image before uploading to the server
import { readAndCompressImage } from 'browser-image-resizer';

// image config
import { imageConfig } from '../../../utils/config';

// to use UUID
import { v4 as uuidv4 } from 'uuid';

// for toast
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
})
export class ModifyComponent implements OnInit {
  // id will be null when the new contact to create
  // id will have the actual id when to update the contact
  // getting id and contact from router state which is comming when user click on te pen tool in the contact card
  // using router state here
  id: string;

  // form properties
  name: string;
  email: string;
  phoneNumber: number;
  address: string;
  favorite: boolean = false;
  // default picture link when no picture is uploaded
  picture: string =
    'https://firebasestorage.googleapis.com/v0/b/kirana-f08b6.appspot.com/o/img.png?alt=media&token=1857e7db-06df-4e77-9756-60aa018e1460';

  // for image(peercent of image uploaded)
  uploadPercent: number = null;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // checking is the user is redirected from the Contact component to update the user
    // if user has id then it must have all properties
    this.id = history.state.id;
    if (history.state.id) {
      // checking and destrucuring the contact and setting that to properties
      const { name, email, phoneNumber, address, isFavorite, picture } = history
        .state.contact as ContactModel;
      this.name = name;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.favorite = isFavorite;
      this.picture = picture;
    }
  }


  // to update the user
  // when updating going for user id
  // and updating it
  updateContact() {
    console.log(`updating ${this.id}`);

    this.db
      .object(`/contacts/${this.id}`)
      .update({
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        isFavorite: this.favorite,
        address: this.address,
        picture: this.picture,
      })
      .then(() => {
        this.toastr.success('Contact updated')
      })
      .catch((err) => {
        // if some error occur
        this.toastr.error('Something wents wrong')
      });
  }

  // adding contact to the firebase DB. Using UUID to create new id of the user
  addContact() {
    const uid = uuidv4();
    this.db
      .object(`/contacts/${uid}`)
      .set({
        id: uid,
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        isFavorite: this.favorite,
        address: this.address,
        picture: this.picture,
      })
      .then(() => {
        this.toastr.success('Contact added successfully')
      })
      .catch((err) => {
        this.toastr.error('Something wents wrong')
      });
  }

  // will fire when user submit the form
  onSubmit() {
    // if their is id then we need to update it
    // otherwise need to create new contact
    if (this.id) {
      this.updateContact();
    } else {
      this.addContact();
    }
  }

  // to handle the upload of the file as soon as the user select the file
  async uploadFile(event) {
    // getting first file
    const file = event.target.files[0];

    // resiging the image with the package "browser-image-resizer "
    let resizedImage = await readAndCompressImage(file, imageConfig);

    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);

    // task will contain all info
    const task = this.storage.upload(filePath, resizedImage);

    // observe percentage changes
    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage;
    });

    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // update complete
            this.picture = url;
            this.toastr.success("Image uploaded successfully")
          });
        })
      )
      .subscribe();
  }
}
