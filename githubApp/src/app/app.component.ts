import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private auth: AuthService) {
    // getting the user from the firebase and subscribing it
    auth.getUser().subscribe(
      (user) => {
        console.log(user);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
