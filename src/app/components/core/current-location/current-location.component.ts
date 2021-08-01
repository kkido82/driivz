import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/model';
import { mapModels } from 'src/app/store/modules/map/models';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.scss']
})
export class CurrentLocationComponent implements OnInit {
  issResponse$: Observable<mapModels.IssResponse> = this.store.select(state => state.map.issResponse);
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
