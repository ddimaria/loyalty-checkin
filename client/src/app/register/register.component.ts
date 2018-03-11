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
import { selectState, selectData } from './../app.reducer';
import { LoginComponent } from './../login/login.component';
import { ValidationMessageComponent } from './../shared/components/validation-message/validation-message.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ValidationMessageComponent]
})
export class RegisterComponent implements OnInit {

  public data: any;
  public form: FormGroup;
  public phoneNumberMask: any[] = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public isLoading = false;

  protected formGroup: FormGroup;
  protected state = 'data';
  protected subscriptions: Subscription[] = [];

  constructor(
    public validation: ValidationMessageComponent,
    protected fb: FormBuilder,
    protected router: Router,
    protected store: Store<any>
  ) {}

  public ngOnInit() {
    this.form = this.fb.group({
      firstName: ['David', Validators.required],
      lastName: ['DiMaria', Validators.required],
      email: ['david.dimaria@mapquest.com', Validators.compose([Validators.required, Validators.email])],
      phone: ['3036383172', Validators.compose([Validators.required, LoginComponent.validatePhoneNumber])],
    });
  }

  public onSubmit() {
    this.form.controls.phone.setValue(parse(this.form.controls.phone.value || '', 'US').phone);

    if (this.form.valid) {
      const payload = {
        ...this.data,
        ...this.form.value,
      };

      this.isLoading = true;
      this.store.dispatch({ type: ACTIONS.REGISTER, payload: payload });
    }
  }

}
