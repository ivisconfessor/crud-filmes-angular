import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  movieId: number = 0;
  movieName: string = "";

  visibilityTable: boolean = true;
  visibilityForm: boolean = false;

  modalRef: any;

  constructor(private moviesService: MoviesService, private modalService: BsModalService) { }

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

  OpenModalConfirmDelete(movieId: number, movieName: string, contentModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(contentModal);
    this.movieId = movieId;
    this.movieName = movieName;
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

  deleteMovie(movieId: number){
    console.log(movieId);

    this.moviesService.DeleteMovie(movieId).subscribe(resultDelete => {
      this.modalRef.hide();

      alert("Filme excluído com Sucesso!");
      
      this.moviesService.GetAll().subscribe(resultMovies => {
        this.movies = resultMovies;
      });
    });
  }
}