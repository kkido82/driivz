import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { IssService } from 'src/app/services/iss.service';
import { reducers, metaReducers, AppState } from 'src/app/store';
import { positionsModels } from 'src/app/store/modules/positions/models';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let service: IssService;
  let store: Store<AppState>;

  const positionsList: positionsModels.Position[] = [
    {
      "name": "223",
      "latitude": -44.3643,
      "longitude": 81.7318,
      "timestamp": 1627851632,
      "selected": false
    },
    {
      "name": "22",
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        HttpClientModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(IssService);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter positions', () => {
    positionsList.forEach(p => service.saveLocation(p));

    component.filter('22');

    store.select(state => state.positions.filtered)
      .subscribe(positions => expect(positions.length).toEqual(2));
  });
});
