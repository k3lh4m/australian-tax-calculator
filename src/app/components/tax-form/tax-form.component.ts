import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ITaxDetails, ITaxForm} from './tax-form.component.interface';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaxFormComponent implements ITaxForm{
  @Output()
  public appTaxFormTaxDetails: EventEmitter<ITaxDetails> = new EventEmitter<ITaxDetails>();

  public incomeFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1),
  ]);

  public superannuationFormControl = new FormControl('', [
    Validators.max(9.5)
  ]);
  public optionSelected: string;
  public incomeAmount: number;
  public superAnnuationPercentage: number;
  public selectDisabled: boolean;
  private taxDetails: ITaxDetails;

  public sendTaxDetails(): void {
    this.setTaxDetails();
    this.appTaxFormTaxDetails.emit(this.taxDetails);
  }

  private setTaxDetails(): void {
    this.selectDisabled = true;

    this.taxDetails = {
      incomeValue: this.incomeAmount,
      incomeOption: this.optionSelected,
      superannuation: this.superAnnuationPercentage
    };
  }
}
