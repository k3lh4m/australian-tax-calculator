import {Component, ViewEncapsulation} from '@angular/core';
import {TaxBand} from './tax-bands.constant';
import {ITaxData} from './components/tax-results/tax-results.component.interface';
import {ITaxDetails} from './components/tax-form/tax-form.component.interface';

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
  public taxResults: ITaxData[];

  constructor() {
  }

  public calculateTax(event: ITaxDetails) {
    this.showResults = true;

    this.superAnnuationAmount = (event.incomeValue / 100) * event.superannuation;

    if (event.incomeOption === 'grossAnnualIncomePlusSuper') {
      this.grossAmount = event.incomeValue - this.superAnnuationAmount;
    }

    if (event.incomeOption === 'grossAnnualIncome') {
      this.grossPlusSuperAmount = event.incomeValue + this.superAnnuationAmount;
    }

    this.taxAmount = this.getTaxAmount(event.incomeValue, TaxBand);

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

  private findRange(target: number, firstRange: number, secondRange?: number): boolean {
    if (!secondRange) {
      return target < firstRange;
    } else {
      return target > firstRange && target <= secondRange;
    }
  }

  private getTaxAmount(incomeValue: number, Taxband): number {
    if (this.findRange(incomeValue, Taxband.bandA)) {
      return 0;
    } else if (this.findRange(incomeValue, Taxband.bandA, Taxband.bandB)) {
      return (incomeValue - Taxband.bandA) * 0.19;
    } else if (this.findRange(incomeValue, Taxband.bandB, Taxband.bandC)) {
      const predefinedTaxAmount = 3572;
      return ((incomeValue - Taxband.bandB) * 0.325) + predefinedTaxAmount;
    } else if (this.findRange(incomeValue, Taxband.bandC, Taxband.bandD)) {
      const predefinedTaxAmount = 19822;
      return ((incomeValue - Taxband.bandC) * 0.37) + predefinedTaxAmount;
    } else {
      const predefinedTaxAmount = 54232;
      return ((incomeValue - Taxband.bandD) * 0.45) + predefinedTaxAmount;
    }
  }
}
