import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): string | null {
    return localStorage.getItem('sessionID');
  }

  removeToken(): void {
    localStorage.removeItem('sessionID');
  }
}
