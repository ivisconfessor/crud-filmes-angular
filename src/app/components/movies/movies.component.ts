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

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {

    this.titleForm = "Novo Filme";

    this.form = new FormGroup({
      movieName: new FormControl(null),
      movieSynopsis: new FormControl(null),
      movieReleaseYear: new FormControl(null),
      movieCurrentlyInTheaters: new FormControl(null)
    });
  }

  sendForm(): void{
    const movie: Movie = this.form.value;

    if (this.form.value.movieCurrentlyInTheaters == "true")
      movie.movieCurrentlyInTheaters = true;
    else
      movie.movieCurrentlyInTheaters = false;

    console.log(movie);

    this.moviesService.SaveMovie(movie).subscribe((resultado) => {
      alert("Filme Cadastrado com Sucesso");
    });
  }

}
