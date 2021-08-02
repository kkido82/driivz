import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IssService } from 'src/app/services/iss.service';
import { reducers, metaReducers, AppState, initialState } from 'src/app/store';
import { positionsModels } from 'src/app/store/modules/positions/models';

import { PositionItemComponent } from './position-item.component';

describe('PositionItemComponent', () => {
  let component: PositionItemComponent;
  let fixture: ComponentFixture<PositionItemComponent>;
  let positions$: Observable<positionsModels.Position[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionItemComponent],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        HttpClientModule
      ],
      providers: [IssService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionItemComponent);
    component = fixture.componentInstance;

    component.position = {
      "name": "5",
      "latitude": 12.3221,
      "longitude": -147.7796,
      "timestamp": 1627853688,
      "selected": false
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove position', () => {
    const issService = TestBed.inject(IssService);
    const store = TestBed.inject(Store);

    issService.saveLocation(component.position);

    positions$ = store.select((state: AppState) => state.positions.saved);

    let sub = positions$.subscribe(ps => expect(ps.length).toBe(1));
    sub.unsubscribe();
    
    component.removePosition();
    sub = positions$.subscribe(ps => expect(ps.length).toBe(0));
  });
});
