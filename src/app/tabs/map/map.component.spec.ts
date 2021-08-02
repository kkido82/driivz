import { HttpClientModule } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { StoreModule } from '@ngrx/store';
import { SimpleModalModule } from 'ngx-simple-modal';
import { reducers, metaReducers } from 'src/app/store';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        HttpClientModule,
        SimpleModalModule,
        GoogleMapsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
