import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ImageSelector } from 'src/app/store/selectors/image.selector';

@Injectable({
  providedIn: 'root'
})
export class SuccessRouterGuardService implements CanLoad {

  constructor(private store: Store, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.getImageIsSetState();
  }

  /**
   * Get image is uploaded or not
   * @returns Observable
   */
  getImageIsSetState(): Observable<boolean> {
    return this.store
      .pipe(
        select(ImageSelector.selectImageIsSet),
        map((status: boolean) => {
          if (status === false) {
            this.router.navigate(['error']);
          }
          return status;
        })
      );
  }
}
