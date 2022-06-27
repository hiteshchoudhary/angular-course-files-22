import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // title of the app
  title = 'LCO Movie app with local storage';
  constructor() {}

  ngOnInit(): void {}
}
