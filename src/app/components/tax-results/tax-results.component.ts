import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ITaxResults} from './tax-results.component.interface';

@Component({
  selector: 'app-tax-results',
  templateUrl: './tax-results.component.html',
  styleUrls: ['./tax-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaxResultsComponent implements ITaxResults {
  @Input()
  public appTaxResultsData;
}


