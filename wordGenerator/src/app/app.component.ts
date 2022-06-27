import { Component } from '@angular/core';
import arrayOfWords from '../utils/words';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // to render words
  words = '';

  // number of words to want
  limit = 10;

  // will change the limit to new limit
  handleSlideChange(newLimit: number) {
    this.limit = newLimit;
  }

  // will generate new words and assign it to the words property
  generate() {
    // importing array of words from "../utils/words.ts"
    this.words = arrayOfWords.slice(0, this.limit).join(' ');
  }
}
