/*

Used ChangeDetectorRef as not updating the view sometimes when variable inside the user changes
usually happen when the user is loggedIn and refresh the pages and then try to search from GitHub api.
It is getting data from the api as we are logging it but not updating UI.
As we making request from the service to githubAPI that's why we need to used this in this component
https://stackoverflow.com/questions/38445670/angular-2-view-will-not-update-after-variable-change-in-subscribe

*/

import { GithubService } from './../../service/github.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnChanges {
  // getting reposUrl from the Home Component
  @Input() repoUrl: string;
  // repos array to hold all repos
  repos = [];
  constructor(
    private gitHubService: GithubService,
    private ref: ChangeDetectorRef
  ) {}

  // using ngOnChanges here
  // as soon as the repoUrl come we check if it preset and if that present then sending the getRequest from service
  ngOnChanges(): void {
    if (this.repoUrl) {
      this.gitHubService.getRepos(this.repoUrl).subscribe(
        (repos: []) => {
          // setting repos to properties
          this.repos = repos;

          // refer above comment for why it has been used
          this.ref.detectChanges();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
