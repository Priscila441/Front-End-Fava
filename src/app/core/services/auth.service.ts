// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'loggedUser';

  setUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.Role === 'Admin';
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user?.IdUser ?? null;
  }
}
