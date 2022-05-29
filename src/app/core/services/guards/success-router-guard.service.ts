import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ImageSelector } from 'src/app/store/selectors/image.selector';

@Injectable({
  providedIn: 'root'
})
export class SuccessRouterGuardService implements CanLoad {

  constructor(private store: Store) { }

  canLoad(): Observable<boolean> {
    return this.getEmailState();
  }

  getEmailState(): Observable<boolean> {
    return this.store
      .pipe(
        select(ImageSelector.selectImageIsSet),
        map((status: boolean) => {
          return status;
        })
      );
  }
}
