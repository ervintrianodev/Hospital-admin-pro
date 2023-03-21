import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: Usuario = new Usuario();
  private baseUrl = environment.baseUrl;
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid() {
    return this.usuario.uid || '';
  }
  constructor(private httpClient: HttpClient) {}

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
  }

  public createUser(formData: RegisterForm) {
    return this.httpClient.post(`${this.baseUrl}/api/users`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  public updateUser(data: { nombre: string; email: string; role: string }) {
    data = {
      ...data,
      role: 'USER_ROLE',
    };
    return this.httpClient.put(
      `${this.baseUrl}/api/users/${localStorage.getItem('uid')}`,
      data,
      {
        headers: { 'x-api-key': this.token },
      }
    );
  }
  public login(formData: LoginForm) {
    return this.httpClient.post(`${this.baseUrl}/login`, formData).pipe(
      tap((response: any) => {
        const { nombre, password, email, imagen, role, _id } = response.usuario;
        this.usuario.email = email;
        this.usuario.nombre = nombre;
        this.usuario.password = '';
        this.usuario.img = imagen;
        this.usuario.uid = _id;
        this.usuario.role = role;
        localStorage.setItem('token', response.token);
        localStorage.setItem('uid', this.usuario.uid || '');
      })
    );
  }
  public loginWithGoogle(token: string) {
    console.log(token);
    return this.httpClient
      .post(`${this.baseUrl}/login/signin/google`, { token })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', token);
        })
      );
  }

  public validateToken(): Observable<boolean> {
    const token: string = this.token;
    return this.httpClient
      .get(`${this.baseUrl}/login/revalidate-token`, {
        headers: { 'x-api-key': token },
      })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
        }),
        map((response) => {
          return true;
        })
      );
  }
}
