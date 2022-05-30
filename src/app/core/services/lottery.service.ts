import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { LotteryModel } from '../models/API/lottery.model';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor(private http: HttpClient) { }

  /**
   * Submit final data
   * @param requestPayload Request payload that contains user data
   * @returns Observable
   */
  submitLotteryData(requestPayload: LotteryModel): Observable<LotteryModel> {
    return this.http.post(`http://localhost:3000/lotteries`, requestPayload).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /**
   * Get total entries for the draw
   * @returns Observable
   */
  getLotteryCount(): Observable<number> {
    return this.http.get(`http://localhost:3000/lotteries`).pipe(
      map((response: any) => {
        return response.length;
      })
    );
  }

  /**
   * @TODO Check email exists going through the whole array since there is no proper API
   * @param email 
   * @returns Observable
   */
  checkEmailExist(email: string): Observable<any> {
    let isEmailExists = false;
    console.log('email', email);
    return this.http.get(`http://localhost:3000/lotteries`);
  }

  /**
   * Get a particula lottery data
   * @returns Observable
   */
   getLotteryData(lotteryID: number): Observable<number> {
    return this.http.get(`http://localhost:3000/lotteries/` + lotteryID).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
