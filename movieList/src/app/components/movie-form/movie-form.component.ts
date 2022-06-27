import { MovieService } from './../../service/movie.service';
import { Movie } from './../../model/Movie';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  movieName: string;
  movieUrl: string;
  movie: Movie;

  // MovieService for handling the movies and ToastService for the toast
  constructor(
    private movieService: MovieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url/49849482
  isValidUrl(string: string) {
    try {
      new URL(string);
    } catch {
      return false;
    }
    return true;
  }

  onSubmit() {
    // checking both fields are pressent or not
    if (!this.movieName || !this.movieUrl) {
      return this.toastr.error('Both fields are required');
    }

    // chekcing the URL is valid or not (by using valid url function)
    if (!this.isValidUrl(this.movieUrl)) {
      return this.toastr.error('Not a valid URL');
    }

    // creating a moive object with fields
    this.movie = {
      id: uuidv4(),
      name: this.movieName,
      url: this.movieUrl,
      date: new Date(),
    };

    // adding movie to the state and resetting fields.
    this.movieService.addMovie(this.movie);
    this.movieName = '';
    this.movieUrl = '';
  }
}
