import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  api: string = 'https://the-trivia-api.com/v2/questions';

  constructor(private http: HttpClient) { }

  traerPreguntas()
  {
    return this.http.get(this.api);
  }
}
