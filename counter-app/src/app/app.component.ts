import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // title of the app
  title = 'Counter App';

  // property to hold the count number
  count: number = 0;

  // will fire when the increase button is clicked
  handleIncrease = () => {
    // increasing the count property by one
    this.count = this.count + 1;
  };

  // will fire when the decrease button is clicked
  handleDecrease = () => {
    // decreasing the count property by one
    this.count = this.count - 1;
  };

  // will fire when the reset button is clicked
  handleReset = () => {
    // setting the count property to 0
    this.count = 0;
  };
}
