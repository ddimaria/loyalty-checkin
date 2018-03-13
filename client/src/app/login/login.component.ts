import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ISubscription, Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import { CustomValidators } from 'ng2-validation';
import { isValidNumber, format, parse } from 'libphonenumber-js';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ACTIONS } from './../app.actions';
import { selectState, selectData, IAppState } from './../app.reducer';
import { ValidationMessageComponent } from './../shared/components/validation-message/validation-message.component';
import { phoneNumberMask } from './../shared/masks';
import { validatePhoneNumber } from './../shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationMessageComponent]
})
export class LoginComponent implements OnInit {

  public data: IAppState;
  public form: FormGroup;
  public isLoading = false;
  public phoneNumberMask = phoneNumberMask;
  public validatePhoneNumber = validatePhoneNumber;

  protected formGroup: FormGroup;

  constructor(
    public validation: ValidationMessageComponent,
    protected fb: FormBuilder,
    protected store: Store<IAppState>
  ) {}

  /**
   * Bootstrap folm validators
   */
  public ngOnInit() {
    this.form = this.fb.group({
      phone: ['', validatePhoneNumber],
    });
  }

  /**
   * Submit the login form
   */
  public onSubmit() {
    this.form.controls.phone.setValue(parse(this.form.controls.phone.value || '', 'US').phone);

    if (this.form.valid) {
      const payload = {
        ...this.data,
        ...this.form.value,
      };

      this.isLoading = true;
      this.store.dispatch({ type: ACTIONS.LOGIN, payload: payload });
    }
  }
}
