import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/model';
import { removeCurrentPosition, selectPosition } from 'src/app/store/modules/positions/actions';
import { positionsModels } from 'src/app/store/modules/positions/models';

@Component({
  selector: 'app-position-item',
  templateUrl: './position-item.component.html',
  styleUrls: ['./position-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionItemComponent implements OnInit {
  @Input() position!: positionsModels.Position;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  removePosition(): void {
    this.store.dispatch(removeCurrentPosition({ position: this.position }));
  }

  select(event: any): void {
    const position = {...this.position};
    position.selected = !position.selected;

    this.store.dispatch(selectPosition({ position }));
  }
}
