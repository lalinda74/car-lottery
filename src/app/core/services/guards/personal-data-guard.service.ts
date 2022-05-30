import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { ContactSelector } from '../../../store/selectors/contact.selector';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataGuardService implements CanLoad {

  constructor(private store: Store, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.getEmailState();
  }

  /**
   * Get email is filled or not
   * @returns Observable
   */
  getEmailState(): Observable<any> {
    return this.store
      .pipe(
        select(ContactSelector.selectEmailFormFilled),
        map((status: boolean) => {
          if (status === false) {
            this.router.navigate(['error']);
          }
          return status;
        })
      );
  }
}
