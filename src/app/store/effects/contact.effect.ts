// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { switchMap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs';
// import * as LoginActions from '../actions/contact.action';

// @Injectable()
// export class ContactEffect {
//   loadItems$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(LoginActions.RequestContactAction),
//       switchMap((action) => {
//         console.log('effect', action);
//         return of(LoginActions.SuccessContactAction({payload: action.payload}));
//       }),
//       catchError((error) =>
//         of({
//           type: '[to-do] error item',
//           message: error,
//         })
//       )
//     )
//   );

//   addItem$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(LoginActions.SuccessContactAction),
//       switchMap((action) => {
//         return of();
//         // this.toDoService.addItem(action.name);
//         // const itemsLoaded = this.toDoService.getItems();
//         // return of({
//         //   type: '[to-do] load items', items: itemsLoaded
//         // });
//       }),
//       catchError((error) =>
//         of({
//           type: '[to-do] error item',
//           message: error,
//         })
//       )
//     )
//   );

//   // deleteItem$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(deleteItem),
//   //     switchMap((action) => {
//   //       return of();
//   //       // this.toDoService.deleteItem(action.item);
//   //       // const itemsLoaded = this.toDoService.getItems();
//   //       // return of({
//   //       //   type: '[to-do] load items', items: itemsLoaded
//   //       // });
//   //     }),
//   //     catchError((error) =>
//   //       of({
//   //         type: '[to-do] error item',
//   //         message: error,
//   //       })
//   //     )
//   //   )
//   // );

//   constructor(private actions$: Actions) {}
// }
