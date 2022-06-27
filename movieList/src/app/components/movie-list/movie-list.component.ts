import { Movie } from './../../model/Movie';
import { MovieService } from './../../service/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  // getting all the movies on init and rendering it
  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      console.warn(movies);
      this.movies = movies;
    });
  }

  // to delete the movie from state and removing from localstorage
  handleDelete = (movie: Movie) => {
    this.movieService.removeMovie(movie);
  };
}
