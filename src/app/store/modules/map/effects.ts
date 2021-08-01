import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IssService } from "src/app/services/iss.service";
import { GET_LOCATION, LOCATION_LOAD_FAILED, LOCATION_LOADED } from "./actions";

@Injectable()
export class MapEffects {
  getLocation$ = createEffect(() => this.actions$.pipe(
    ofType(GET_LOCATION),
    mergeMap(() => this.issService.getCurrentLocation()
      .pipe(
        map(issResponse => ({ type: LOCATION_LOADED, issResponse })),
        catchError(() => of({ type: LOCATION_LOAD_FAILED }))
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private issService: IssService
  ) { }
}
