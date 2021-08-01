import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search-display/search.component';
import { FilterInputComponent } from './search-display/filter-input/filter-input.component';
import { CurrentLocationComponent } from './current-location/current-location.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { PositionItemComponent } from './search-display/position-item/position-item.component';

@NgModule({
  declarations: [
    SearchComponent,
    FilterInputComponent,
    CurrentLocationComponent,
    ModalComponent,
    PositionItemComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
    CurrentLocationComponent
  ]
})
export class CoreModule { }
