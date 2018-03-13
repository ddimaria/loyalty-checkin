import { FormControl } from '@angular/forms';
import { isValidNumber, parse } from 'libphonenumber-js';

export const validatePhoneNumber = (control: FormControl) => {
  try {
    return isValidNumber(parse(control.value, 'US')) ? null : { phone: true };
  } catch (e) {
    return { phone: true };
  }
};
