import { ToastrService } from 'ngx-toastr';
// to redirect user
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

// to use finilize
import { finalize } from 'rxjs/operators';

// firebase stuffs
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

// to compress image before uploading to the server
import { readAndCompressImage } from 'browser-image-resizer';

// image config
import { imageConfig } from '../../../utils/config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // default picture link when no picture is uploaded
  picture: string =
    'https://firebasestorage.googleapis.com/v0/b/kirana-f08b6.appspot.com/o/img.png?alt=media&token=1857e7db-06df-4e77-9756-60aa018e1460';

  // for image(percent of image uploaded)
  uploadPercent: number = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    // destructuring email and password
    const { email, password, username, country, bio, name } = f.form.value;

    this.auth
      .signUp(email, password)
      .then((res) => {
        // as soon as the signup is completed we are creating one user in firebase Realtime DB to store its details
        console.log(res);

        // using his uid to create unique one
        const { uid } = res.user;

        // creating one user in DB
        this.db
          .object(`/users/${uid}`)
          .set({
            id: uid,
            name: name,
            email: email,
            instaUserName: username,
            country: country,
            bio: bio,
            picture: this.picture,
          })
          .then(() => {
            // as soon as saved in DB then redirecting to home
            this.router.navigateByUrl('/');
            this.toastr.success('Auth complete');
          })
          .catch((err) => {
            // to show some error occuried
            this.toastr.error('Something wents wrong');
          });
      })
      .catch((err) => {
        // signup catch block
        console.error(err.message);
        this.toastr.error(err.message);
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
            this.toastr.success('Image uploaded successfully');
          });
        })
      )
      .subscribe();
  }
}
