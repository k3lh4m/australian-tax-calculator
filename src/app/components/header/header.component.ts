import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IHeader} from './header.component.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements IHeader {
  @Input()
  public appHeaderTitle: string;

}
