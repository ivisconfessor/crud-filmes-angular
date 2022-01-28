import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Movie } from '../../models/Movie';
import { MoviesService } from './../../movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  titleForm: string = "";
  form: any;
  movies: Movie[] = [];

  visibilityTable: boolean = true;
  visibilityForm: boolean = false;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {

    this.moviesService.GetAll().subscribe(result => {
      this.movies = result;
    })
  }

  showForm(): void {
    this.visibilityTable = false;
    this.visibilityForm = true;

    this.titleForm = "Novo Filme";

    this.form = new FormGroup({
      movieName: new FormControl(null),
      movieSynopsis: new FormControl(null),
      movieReleaseYear: new FormControl(null),
      movieCurrentlyInTheaters: new FormControl(null)
    });
  }

  showFormUpdate(movieId: number) : void {
    this.visibilityTable = false;
    this.visibilityForm = true;

    this.moviesService.GetMovie(movieId).subscribe(result => {
      this.titleForm = `Atualizar Filme ${result.movieName}`;
      
      this.form = new FormGroup({
        movieId: new FormControl(result.movieId),
        movieName: new FormControl(result.movieName),
        movieSynopsis: new FormControl(result.movieSynopsis),
        movieReleaseYear: new FormControl(result.movieReleaseYear),
        movieCurrentlyInTheaters: new FormControl(String(result.movieCurrentlyInTheaters)) 
      });
    });
  }

  hideForm(): void {
    this.visibilityTable = true;
    this.visibilityForm = false;
  }

  sendForm(): void{
    const movie: Movie = this.form.value;

    if (this.form.value.movieCurrentlyInTheaters == "true")
      movie.movieCurrentlyInTheaters = true;
    else
      movie.movieCurrentlyInTheaters = false;

    if (movie.movieId > 0) {
      this.moviesService.UpdateMovie(movie).subscribe(resultUpdate => {
        this.visibilityForm = false;
        this.visibilityTable = true;

        alert("Filme Atualizado com Sucesso!");

        this.moviesService.GetAll().subscribe(result => {
          this.movies = result;
        });
      });
    }
    else {
      this.moviesService.SaveMovie(movie).subscribe((resultado) => {
        this.visibilityForm = false;
        this.visibilityTable = true;
  
        alert("Filme Cadastrado com Sucesso");
  
        this.moviesService.GetAll().subscribe(result => {
          this.movies = result;
        });
      });
    }

    console.log(movie);
  }
}