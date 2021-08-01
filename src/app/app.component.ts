import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/model';
import { selectTab } from './store/modules/app/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'driivz';


  constructor(private router: Router, private store: Store<AppState>) { }

  navigate(route: string) {
    this.store.dispatch(selectTab({ tab: route }));
    this.router.navigate([route]);
  }
}
