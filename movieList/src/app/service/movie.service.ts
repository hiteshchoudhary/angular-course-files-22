import { Movie } from './../model/Movie';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: Movie[] = [];
  constructor() {
    // getting the list of movie from localstorage and if there is any then setting it.
    let movies_list = localStorage.getItem('@movies_list');
    if (movies_list) {
      this.movies = JSON.parse(movies_list);
    }
  }

  // used to get the list of movies and sending Observable of Moives
  getMovies() {
    return of(this.movies);
  }

  // used to add movie at the start of array and also to localstorage
  addMovie(movie: Movie) {
    this.movies.unshift(movie);
    localStorage.setItem('@movies_list', JSON.stringify(this.movies));
  }

  // To remove the movie from the list and localstorage
  removeMovie(movie: Movie) {
    const indexofMovie = this.movies.findIndex(
      (currentObj) => currentObj.id === movie.id
    );
    this.movies.splice(indexofMovie, 1);
    localStorage.setItem('@movies_list', JSON.stringify(this.movies));
  }
}
