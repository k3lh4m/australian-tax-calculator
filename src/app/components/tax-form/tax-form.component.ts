import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ITaxDetails, ITaxForm} from './tax-form.component.interface';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaxFormComponent implements ITaxForm {
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
  public showResetButton: boolean;
  private taxDetails: ITaxDetails;

  public sendTaxDetails(): void {
    this.setTaxDetails();
    this.showResetButton = true;
    this.appTaxFormTaxDetails.emit(this.taxDetails);
  }

  public refreshData(): void {
    this.incomeFormControl.enable();
    this.incomeFormControl.reset();
    this.superannuationFormControl.enable();
    this.superannuationFormControl.reset();
    this.selectDisabled = false;
    this.showResetButton = false;
  }

  private setTaxDetails(): void {
    this.selectDisabled = true;
    this.incomeFormControl.disable();
    this.superannuationFormControl.disable();

    this.taxDetails = {
      incomeValue: this.incomeAmount,
      incomeOption: this.optionSelected,
      superannuation: this.superAnnuationPercentage
    };
  }
}
