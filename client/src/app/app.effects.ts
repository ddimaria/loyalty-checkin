import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { ACTIONS } from './app.actions';
import { AppService } from './app.service';

@Injectable()
export class Effects {
  constructor(
    private actions: Actions,
    private appService: AppService,
    private router: Router
  ) {}

  // LOGIN
  @Effect()
  login: Observable<Action> = this.actions
    .ofType(ACTIONS.LOGIN)
    .mergeMap((action: any) =>
      this.appService
        .login(action.payload.phone)
        .map(data => ({ type: ACTIONS.LOGIN_SUCCESS, payload: data }) )
        .do((data: any) => this.router.navigate(['/profile']))
        .catch(error =>
          Observable.of({ type: ACTIONS.NEEDS_TO_REGISTER, payload: { data: { phone: action.payload.phone }} }))
        );

  // NOT_LOGED_IN
  @Effect({dispatch: false})
  notLoggedIn: Observable<Action> = this.actions
    .ofType(ACTIONS.NOT_LOGED_IN)
    .do((data: any) => this.router.navigate(['/']));

  // NEEDS_TO_REGISTER
  @Effect({dispatch: false})
  needsToLogin: Observable<Action> = this.actions
    .ofType(ACTIONS.NEEDS_TO_REGISTER)
    .do((data: any) => this.router.navigate(['/register']));

  // REGISTER
  @Effect()
  register: Observable<Action> = this.actions
    .ofType(ACTIONS.REGISTER)
    .mergeMap((action: any) =>
      this.appService
        .register(action.payload)
        .map(data => ({ type: ACTIONS.REGISTER_SUCCESS, payload: data }) )
        .do((data: any) => this.router.navigate(['/profile']))
        .catch(error =>
          Observable.of({ type: ACTIONS.NEEDS_TO_REGISTER, payload: { data: { phone: action.payload.phone }} })));
}
