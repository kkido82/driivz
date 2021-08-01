import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Store, select } from '@ngrx/store';
import { SimpleModalService } from 'ngx-simple-modal';
import { interval, Observable } from 'rxjs';
import { filter, skip } from 'rxjs/operators';
import { ModalComponent } from 'src/app/components/core/modal/modal.component';
import { IssService } from 'src/app/services/iss.service';
import { AppState } from 'src/app/store/model';
import { positionsModels } from 'src/app/store/modules/positions/models';
import { environment } from 'src/environments/environment';
import { mapModels } from '../../store/modules/map/models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  issResponse$: Observable<mapModels.IssResponse> = this.store.select((state: AppState) => state.map.issResponse);
  positions$: Observable<positionsModels.Position[]> = this.store.select(state => state.positions.saved);
  selected$: Observable<positionsModels.Position | null> = this.store.select(state => state.positions.selected);

  $map!: GoogleMap;

  @ViewChild('maps') set map(ref: GoogleMap) {
    if (ref) {
      this.$map = ref;
    }
  };

  marker!: any;
  position!: positionsModels.Position;
  controlTrashUI!: HTMLElement;

  zoom = 5;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
  };

  constructor(private store: Store<AppState>, private issService: IssService,
    private simpleModalService: SimpleModalService) { }

  ngOnInit(): void {
    this.issResponse$.subscribe(res => {
      this.addMarker(res)
    });


    this.selected$.subscribe(position => {
      if (position) {
        this.issService.stop();
        
        this.addMarker({
          timestamp: position.timestamp,
          message: '',
          iss_position: {
            latitude: position.latitude,
            longitude: position.longitude
          },
        });
      } else {
        this.issService.start();
      }
    });
  }

  ngAfterViewInit(): void {
    this.controlTrashUI = document.createElement('DIV');
    this.controlTrashUI.innerHTML = '+';
    this.controlTrashUI.style.fontSize = '25px';
    this.controlTrashUI.style.textAlign = 'center';
    this.controlTrashUI.style.cursor = 'pointer';
    this.controlTrashUI.style.backgroundColor = 'gray';
    this.controlTrashUI.style.height = '28px';
    this.controlTrashUI.style.width = '25px';
    this.controlTrashUI.style.borderRadius = '100%';
    this.controlTrashUI.addEventListener('click', this.saveLocation.bind(this));

    this.$map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.controlTrashUI);
  }

  ngOnDestroy(): void {
    this.issService.stop();
    this.controlTrashUI.removeEventListener('click', this.saveLocation);
  }

  addMarker(response: mapModels.IssResponse) {
    const icon: google.maps.Icon = {
      url: '../../../assets/satellite-icon.png',
      size: {
        height: 100,
        width: 100,
        equals: function (other: google.maps.Size) {
          return this.height === other.height && this.width === other.width;
        }
      }
    };

    this.center = {
      lat: +response.iss_position.latitude,
      lng: +response.iss_position.longitude,
    };

    this.marker = {
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      icon,
    };

    this.position = {
      name: '',
      latitude: this.center.lat,
      longitude: this.center.lng,
      timestamp: response.timestamp,
      selected: false,
    };
  }

  saveLocation() {
    let disposable = this.simpleModalService.addModal(ModalComponent, {
      title: 'Choose location name',
      message: 'name is requierd:'
    }).subscribe((name) => {
      if (name) {
        let exists = false;
        this.positions$.subscribe(value => {
          exists = value.some(position => position.name === name)
        });
        
        if (exists) {
          alert('name already exists');
          return;
        }

        this.position.name = name;
        this.issService.saveLocation(this.position);
      }
      else {
        console.log('declined');
      }
    });
  }
}
