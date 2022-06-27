import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getUserDetails(userName: string) {
    // to get user details from the github api
    return this.http.get(`https://api.github.com/users/${userName}`);
  }
  getRepos(repoUrl: string) {
    // to get repositry list from the url
    return this.http.get(repoUrl);
  }
}
