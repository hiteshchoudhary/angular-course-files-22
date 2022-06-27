import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    // destructuring email and password
    const { email, password } = f.form.value;

    this.auth
      .signUp(email, password)
      .then((res) => {
        // when the signup is completed then sending to home
        this.router.navigateByUrl('/');
        this.toastr.success('Auth complete');
      })
      .catch((err) => {
        console.error(err.message);
        this.toastr.error(err.message);
      });
  }
}
