import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LOCALE_ID} from '@angular/core';
import {AppComponent} from './app.component';
import {
  ErrorStateMatcher,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatListModule, MatSelectModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {HeaderComponent} from './components/header/header.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {AusDollarPipe} from './pipes/aus-dollar.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaxResultsComponent} from './components/tax-results/tax-results.component';
import {TaxFormComponent} from './components/tax-form/tax-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AusDollarPipe,
    TaxResultsComponent,
    TaxFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    NoopAnimationsModule,
    FormsModule,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: LOCALE_ID, useValue: 'en-AU'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
