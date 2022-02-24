import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private httpClient: HttpClient) { }

  get params() {
    return new HttpParams().set('fields', 'name,capital,population,flags,cca2');
  }

  buscarPais( termino: string ): Observable<Pais[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.httpClient.get<Pais[]>( url, {params: this.params} );
  }

  buscarCapital( termino: string): Observable<Pais[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.httpClient.get<Pais[]> ( url, {params: this.params} );
  }

  getPais( codigoPais: string): Observable<Pais[]> {
    const url = `${this.apiUrl}/alpha/${codigoPais}`;
    return this.httpClient.get<Pais[]>( url );
  }

  buscarPaisPorRegion(region:string) {
    const url = `${this.apiUrl}/region/${region}`;
    return this.httpClient.get<Pais[]> ( url, {params: this.params} );
  }
}
