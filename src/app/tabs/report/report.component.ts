import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { positionsModels } from 'src/app/store/modules/positions/models';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  positions$: Observable<positionsModels.Position[]> = this.store.select(state => state.positions.saved);

  constructor(private store: Store<AppState>,) { }

  ngOnInit(): void {
  }

}
