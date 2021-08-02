import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IssService } from 'src/app/services/iss.service';
import { AppState } from 'src/app/store/model';
import { selectPosition } from 'src/app/store/modules/positions/actions';
import { positionsModels } from 'src/app/store/modules/positions/models';

@Component({
  selector: 'app-position-item',
  templateUrl: './position-item.component.html',
  styleUrls: ['./position-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionItemComponent {
  @Input() position!: positionsModels.Position;

  constructor(private store: Store<AppState>, private issService: IssService) { }

  removePosition(): void {
    this.issService.removePosition(this.position);
  }

  select(event: any): void {
    const position = {...this.position};
    position.selected = !position.selected;

    this.store.dispatch(selectPosition({ position }));
  }
}
