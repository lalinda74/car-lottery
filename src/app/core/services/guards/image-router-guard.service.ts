import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { PersonalDataSelector } from 'src/app/store/selectors/personal.selector';

@Injectable({
  providedIn: 'root'
})
export class ImageRouterGuardService {

  constructor(private store: Store, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.getPersonalDataFilledState();
  }

  /**
   * Get Personal data filled or not state
   * @returns Observable
   */
  getPersonalDataFilledState(): Observable<any> {
    return this.store
      .pipe(
        select(PersonalDataSelector.selectPersonalDataFilled),
        map((status: boolean) => {
          if (status === false) {
            this.router.navigate(['error']);
          }
          return status;
        })
      );
  }
}
