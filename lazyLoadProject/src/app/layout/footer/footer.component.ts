import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  date = null;
  constructor() {
    this.date = new Date().toDateString();
  }

  ngOnInit(): void {}
}
