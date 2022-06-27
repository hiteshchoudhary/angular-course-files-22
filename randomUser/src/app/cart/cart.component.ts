import { Component, OnInit, Input } from '@angular/core';
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // to use fontAwesome icons
  faEnvelope = faEnvelope;
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faDatabase = faDatabase;

  // user which is passed from the parent component
  @Input() user;
  constructor() {}

  ngOnInit(): void {}

  // rendering everything in the html
}
