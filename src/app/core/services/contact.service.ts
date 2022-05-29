import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  /**
   * Submit final data
   * @param requestPayload Request payload that contains user data
   * @returns 
   */
  submitLotteryData(requestPayload: any): any {
    return this.http.post(`http://localhost:3000/lotteries`, requestPayload);
  }

  
}
