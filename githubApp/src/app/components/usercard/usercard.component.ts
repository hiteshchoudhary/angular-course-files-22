import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css'],
})
export class UsercardComponent {
  // Will get user from Home component
  // user has lots of property thats why not making model for it
  @Input() user;

  constructor() {}
}
