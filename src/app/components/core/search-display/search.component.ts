import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/model';
import { filterPosition } from 'src/app/store/modules/positions/actions';
import { positionsModels } from 'src/app/store/modules/positions/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  positions$: Observable<positionsModels.Position[]> = this.store.select(state => state.positions.filtered);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    
  }

  filter(name: string): void {
    this.store.dispatch(filterPosition({ name }));
  }
}
