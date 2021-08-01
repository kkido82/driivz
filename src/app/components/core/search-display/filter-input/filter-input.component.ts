import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { positionsModels } from 'src/app/store/modules/positions/models';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterInputComponent implements OnInit {
  @Input() positions!: positionsModels.Position[] | null | undefined;
  @Output() filter = new EventEmitter<string>();
  searchTerm$: Observable<string> = this.store.select(state => state.positions.searchTerm);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { }

  keyup($event: any) {
    this.filter.emit($event.target.value.toLowerCase());
  }
}
