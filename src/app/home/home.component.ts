import { LoadCurrentUser } from './../actions/auth.actions';
import { Store } from '@ngrx/store';
import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private storageService: StorageService, private store: Store) {}

  ngOnInit(): void {
    const token = this.storageService.getToken();
    if (token != null) {
      this.store.dispatch(new LoadCurrentUser());
    }
  }
}
