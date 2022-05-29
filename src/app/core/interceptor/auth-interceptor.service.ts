import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request));
  }

  /**
   * Add auth token to http requests
   * @param request 
   * @returns Http request
   */
  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getAuthToken();

    return request.clone({
        setHeaders: {
          Authorization: `Basic ${token}`
        }
    })
  }
}
