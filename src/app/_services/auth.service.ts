import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/auth/login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, role: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
   
      password, role
    }, httpOptions);
  }
}
