import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from './models/Movie';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = 'https://crud-filmes-api-aspnetcore.scm.azurewebsites.net/api/movies';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url);
  }

  GetMovie(idMovie: number): Observable<Movie> {
    const apiUrl = `${this.url}/${idMovie}`;
    return this.http.get<Movie>(apiUrl);
  }

  SaveMovie(movie: Movie): Observable<any> {
    return this.http.post<Movie>(this.url, movie, httpOptions);
  }

  UpdateMovie(movie: Movie): Observable<any> {
    return this.http.put<Movie>(this.url, movie, httpOptions);
  }

  DeleteMovie(idMovie: number): Observable<any> {
    const apiUrl = `${this.url}/${idMovie}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
