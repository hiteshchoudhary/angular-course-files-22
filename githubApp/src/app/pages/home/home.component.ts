/*


Used ChangeDetectorRef as not updating the view sometimes when variable inside the user changes
usually happen when the user is loggedIn and refresh the pages and then try to search from GitHub api.
It is getting data from the api as we are logging it but not updating UI.
As we making request from the service to githubAPI that's why we need to used this in this component
https://stackoverflow.com/questions/38445670/angular-2-view-will-not-update-after-variable-change-in-subscribe

Background: when changing a value via .subscribe() angular does not notify that it should run change detection.
So you need to run it yourself.

*/
import { GithubService } from './../../service/github.service';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user = null;
  userName: string;
  Error = null;
  constructor(
    private githubSerice: GithubService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  // will run when the form is submitted
  handleFind() {
    this.githubSerice.getUserDetails(this.userName).subscribe(
      (user) => {
        // when their is some user otherwise control goes to error callback function (below one)
        // setting local user to update UI
        this.user = user;

        // setting error to null if there is any
        this.Error = null;

        // refer above comment for why it has been used
        this.ref.detectChanges();
      },
      (err) => {
        // setting user to null if something wrong happened
        this.user = null;

        // setting error to "user not found" if there is any
        this.Error = 'User not found';

        // refer above comment for why it has been used
        this.ref.detectChanges();
      }
    );
  }
}
