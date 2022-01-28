import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  form: any;
  titleForm: string = "";

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      movieName: new FormControl(null),
      movieSynopsis: new FormControl(null),
      movieReleaseYear: new FormControl(null),
      movieCurrentlyInTheaters: new FormControl(null)
    });
  }

}
