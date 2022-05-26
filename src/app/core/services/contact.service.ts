import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  submitContactData(): any {
    return this.httpClient.get('https://dummy.restapiexample.com/api/v1/employees');
  }
}
