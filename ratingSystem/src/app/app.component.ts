import { Component } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // number of the star selected
  // default in none
  selectedStar: number;

  // to use fontAwesome icon
  faStar = faStar;

  // will run whenever any star is clicked/hover (if added hover instead of click)
  // will have the number as parameter and setting that to selectedStar properties
  setSelectedStar(num: number) {
    this.selectedStar = num;
  }
}
