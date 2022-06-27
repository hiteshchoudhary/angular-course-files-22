import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email = null;
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    auth.getUser().subscribe((user) => {
      // if user present then setting email
      this.email = user?.email;
    });
  }

  ngOnInit(): void {}

  // will handle signout
  async handleSignOut() {
    try {
      // sending signOut request
      await this.auth.signOut();

      // if signout succcessful then sending to signIn screen
      this.router.navigateByUrl('/signin');
      this.toastr.info('Login Again to continue');
      this.email = null;
    } catch (error) {
      // if some error occur
      this.toastr.error('Something went wrong');
    }
  }
}
