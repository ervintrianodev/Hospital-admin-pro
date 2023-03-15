import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  public logout() {
    localStorage.removeItem('token');
  }

  public createUser(formData: RegisterForm) {
    return this.httpClient.post(`${this.baseUrl}/api/users`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  public login(formData: LoginForm) {
    return this.httpClient.post(`${this.baseUrl}/login`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
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
    const token: string = localStorage.getItem('token') || '';
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
