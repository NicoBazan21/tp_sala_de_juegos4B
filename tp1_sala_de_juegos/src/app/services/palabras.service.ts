import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PalabrasService {

  api: string = 'https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=8';

  constructor(private http: HttpClient) { }

  traerPalabra()
  {
    return this.http.get(this.api);
  }
}
