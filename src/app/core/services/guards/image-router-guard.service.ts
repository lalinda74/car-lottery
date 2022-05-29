import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { PersonalDataSelector } from 'src/app/store/selectors/personal.selector';

@Injectable({
  providedIn: 'root'
})
export class ImageRouterGuardService {

  constructor(private store: Store) { }

  canLoad(): Observable<boolean> {
    return this.getEmailState();
  }

  getEmailState(): Observable<any> {
    return this.store
      .pipe(
        select(PersonalDataSelector.selectPersonalDataFilled),
        map((status: boolean) => {
          return status;
        })
      );
  }
}
