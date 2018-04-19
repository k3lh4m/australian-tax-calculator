import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TaxBand} from './tax-bands.constant';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public appTitle = 'Australian Tax Calculator - 2016/17';

  public grossAmount: number;
  public grossPlusSuperAmount: number;
  public taxAmount: number;
  public netAmount: number;
  public netPlusSuper: number;
  public showResults: boolean;
  public superAnnuationAmount: number;
  public taxResults: any[];

  constructor() {
  }

  public calculateTax(event) {
    this.showResults = true;

    this.superAnnuationAmount = (event.incomeValue / 100) * event.superannuation;

    if (event.incomeOption === 'grossAnnualIncomePlusSuper') {
      this.grossAmount = event.incomeValue - this.superAnnuationAmount;
    }

    if (event.incomeOption === 'grossAnnualIncome') {
      this.grossPlusSuperAmount = event.incomeValue + this.superAnnuationAmount;
    }

    if (this.findRange(event.incomeValue, TaxBand.bandA)) {
      this.taxAmount = 0;
    } else if (this.findRange(event.incomeValue, TaxBand.bandA, TaxBand.bandB)) {
      this.taxAmount = (event.incomeValue - TaxBand.bandA) * 0.19;
    } else if (this.findRange(event.incomeValue, TaxBand.bandB, TaxBand.bandC)) {
      const predefinedtaxsumBANDB = 3572;
      this.taxAmount = ((event.incomeValue - TaxBand.bandB) * 0.325) + predefinedtaxsumBANDB;
    } else if (this.findRange(event.incomeValue, TaxBand.bandC, TaxBand.bandD)) {
      const predefinedtaxsumBANDC = 19822;
      this.taxAmount = ((event.incomeValue - TaxBand.bandC) * 0.37) + predefinedtaxsumBANDC;
    } else {
      const predefinedtaxsumBANDD = 54232;
      this.taxAmount = ((event.incomeValue - TaxBand.bandD) * 0.45) + predefinedtaxsumBANDD;
    }

    this.netAmount = event.incomeValue - this.taxAmount;
    this.netPlusSuper = this.netAmount + this.superAnnuationAmount;

    this.taxResults = [
      {
        label: 'Superannuation Amount',
        value: this.superAnnuationAmount
      },
      {
        label: 'Gross Amount',
        value: this.grossAmount
      },
      {
        label: 'Gross Amount + Super',
        value: this.grossPlusSuperAmount
      },
      {
        label: 'Tax Amount',
        value: this.taxAmount
      },
      {
        label: 'Net Amount',
        value: this.netAmount
      },
      {
        label: 'Net + Superannuation',
        value: this.netPlusSuper
      }
    ];
  }

  public findRange(target, firstRange, secondRange?) {
    if (!secondRange) {
      return target < firstRange;
    } else {
      return target > firstRange && target <= secondRange;
    }
  }
}
