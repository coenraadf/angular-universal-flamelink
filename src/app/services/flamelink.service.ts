import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import * as flamelink from 'flamelink';

@Injectable({
  providedIn: 'root'
})
export class FlamelinkService {

  private _flApp: any;
  get flApp(): any {
    return this._flApp;
  }
  set flApp(value: any) {
    this._flApp = value;
  }

  constructor(@Inject(FirebaseApp) private _fb: firebase.app.App) {
    this.flApp = flamelink({
      firebaseApp: _fb
    });
  }

  getApp() {
    return this.flApp;
  }
}
