import { Component, OnInit, Input } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit {
  // getting from app.component.ts
  @Input() iconName: string;

  // to use icons in the icon.component.html
  faPen = faPen;
  faTimes = faTimes;
  faCircle = faCircle;
  constructor() {}

  ngOnInit(): void {}
}
