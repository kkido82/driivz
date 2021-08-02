import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, metaReducers, AppState } from '../store';

import { IssService } from './iss.service';

describe('IssService', () => {
  let service: IssService;
  let store: Store<AppState>;

  const positionsList = [
    {
      "name": "3",
      "latitude": -44.3643,
      "longitude": 81.7318,
      "timestamp": 1627851632,
      "selected": false
    },
    {
      "name": "2",
      "latitude": -39.1933,
      "longitude": 166.6017,
      "timestamp": 1627852612,
      "selected": false
    },
    {
      "name": "4",
      "latitude": -15.7091,
      "longitude": -168.249,
      "timestamp": 1627853131,
      "selected": false
    },
    {
      "name": "5",
      "latitude": 12.3221,
      "longitude": -147.7796,
      "timestamp": 1627853688,
      "selected": false
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ]
    });
    service = TestBed.inject(IssService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save positions to store', () => {
    let positions$ = store.select((state: AppState) => state.positions.saved);

    positionsList.forEach(p => service.saveLocation(p));

    let sub = positions$.subscribe(positions => expect(positions.length).toEqual(positionsList.length));
    sub.unsubscribe();
    positionsList.forEach(p => service.removePosition(p));

    sub = positions$.subscribe(positions => expect(positions.length).toEqual(0));
    sub.unsubscribe();
  });

  it('should subscribe to observable', () => {
    expect(service.locationSub).toBeFalsy();

    service.start();

    expect(service.locationSub).toBeTruthy();
  });

  it('should close subscription to observable', () => {
    service.start();
    expect(service.locationSub.closed).toBeFalse();

    service.stop();
    expect(service.locationSub.closed).toBeTrue();
  });
});
