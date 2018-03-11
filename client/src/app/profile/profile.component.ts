import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ISubscription, Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import { CustomValidators } from 'ng2-validation';
import { isValidNumber, format, parse } from 'libphonenumber-js';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { conformToMask } from 'angular2-text-mask';
import { format as formatDate, parse as parseDate } from 'date-fns';

import { ACTIONS } from './../app.actions';
import { selectState, selectData } from './../app.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public data: any;
  public isLoading = true;
  public formatDate = formatDate;
  public parseDate = parseDate;

  protected state = 'data';
  protected subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected store: Store<any>
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select(selectData)
        .subscribe(data => this.onDataLoad(data))
    );
  }

  public ngOnDestroy() {
    this.safeUnsubscribe(this.subscriptions);
  }

  public onSubmit() {
    this.store.dispatch({ type: ACTIONS.NOT_LOGED_IN });
  }

   /**
   * Unsubscribe to subscriptions only if they are still subscribed
   *
   * @param subscriptions[]
   */
  public safeUnsubscribe(subscriptions: Subscription[]) {
    subscriptions.forEach(subscription =>  subscription.unsubscribe());
  }

  private onDataLoad(data: any) {
    this.data = data;
    this.isLoading = false;

    if (!this.data.authenticated) {
      this.store.dispatch({ type: ACTIONS.NOT_LOGED_IN});
    }
  }

}
