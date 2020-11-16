import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _isVisibleToggleMenu: boolean;

  constructor(private http: HttpClient) {
    this.isVisibleToggleMenu = true;
  }


  public sendUserData(user: User){
    return this.http.get("/api/courseworkWeb/user")
  }

  get isVisibleToggleMenu(): boolean {
    return this._isVisibleToggleMenu;
  }

  set isVisibleToggleMenu(value: boolean) {
    this._isVisibleToggleMenu = value;
  }


}
