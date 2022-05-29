import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { ContactSelector } from '../../../store/selectors/contact.selector';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataGuardService implements CanLoad {

  constructor(private store: Store) { }

  canLoad(): Observable<boolean> {
    return this.getEmailState();
  }

  getEmailState(): Observable<any> {
    return this.store
      .pipe(
        select(ContactSelector.selectEmailFormFilled),
        map((status: boolean) => {
          return status;
        })
      );
  }
}
