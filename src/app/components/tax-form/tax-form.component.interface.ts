import {EventEmitter} from '@angular/core';

export interface ITaxDetails {
  incomeValue: number;
  incomeOption: string;
  superannuation: number;
}

export interface ITaxForm {
  appTaxFormTaxDetails: EventEmitter<ITaxDetails>;
}
