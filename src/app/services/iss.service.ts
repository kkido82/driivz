import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { interval, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IssResponse } from '../models/iss.model';
import { getLocation, GET_LOCATION } from '../store/modules/map/actions';
import { mapModels } from '../store/modules/map/models';
import { saveCurrentPosition, SAVE_POSITION } from '../store/modules/positions/actions';
import { positionsModels } from '../store/modules/positions/models';

@Injectable({
  providedIn: 'root'
})
export class IssService {
  locationSub!: Subscription;
  constructor(private http: HttpClient, private store: Store) { }

  start() {
    this.store.dispatch({ type: GET_LOCATION });

    this.locationSub = interval(environment.interval_sec * 1000)
      .subscribe(() => {
        console.log('dispatching get loacation');
        this.store.dispatch(getLocation());
      });
  }

  stop() {
    this.locationSub.unsubscribe();
  }

  getCurrentLocation(): Observable<IssResponse> {
    return this.http.get<IssResponse>(environment.iss_endpoint);
  }

  saveLocation(position: positionsModels.Position) {
    console.log('dispatching save', 'position:', position);
    this.store.dispatch(saveCurrentPosition({ position }));
  }
}
