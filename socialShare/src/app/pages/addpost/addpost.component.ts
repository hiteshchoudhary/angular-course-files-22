import { Component, OnInit } from '@angular/core';
// firebase stuffs
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './../../service/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

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
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
})
export class AddpostComponent implements OnInit {
  // form properties
  locationName: string;
  description: string;
  picture: string = null;

  // to hold current user
  user = null;

  // for image(percent of image uploaded)
  uploadPercent: number = null;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    auth: AuthService
  ) {
    // getting user form service
    auth.getUser().subscribe((user) => {
      // getting user DETAILS from the firebase
      this.db
        .object(`/users/${user.uid}`)
        .valueChanges()
        .subscribe((user) => {
          // users details setting to local user
          console.log('firebase user', user);
          this.user = user;
        });
    });
  }

  ngOnInit(): void {}

  // will fire when user submit the form
  onSubmit() {
    // generating one unique id
    const uid = uuidv4();

    // to add one post in DB
    this.db
      .object(`/posts/${uid}`)
      .set({
        id: uid,
        locationName: this.locationName,
        description: this.description,
        picture: this.picture,
        by: this.user.name,
        instaId: this.user.instaUserName,
        date: Date.now(),
      })
      .then(() => {
        this.toastr.success('Post added successfully');
      })
      .catch(() => {
        this.toastr.error('Something wents wrong');
      });
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
            this.toastr.info('Image uploaded successfully');
          });
        })
      )
      .subscribe();
  }
}
