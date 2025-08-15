import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserPostDto } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5054/api/User'; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(dto: UserPostDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, dto);
  }

  updateUser(id: number, dto: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  login(email: string, password: string): Observable<User> {
  return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
}

}
