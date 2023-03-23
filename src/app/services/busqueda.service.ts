import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  private baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  public buscar(
    collection: 'usuarios' | 'medicos' | 'hospitales',
    query: string = ''
  ) {
    //localhost:4000/buscar/collection/hospitales/er
    const url = `${this.baseUrl}/buscar/collection/${collection}/${query}`;
    return this.httpClient.get(url, {
      headers: { 'x-api-key': localStorage.getItem('token') || '' },
    });
  }
  get token() {
    return localStorage.getItem('token') || '';
  }
}
