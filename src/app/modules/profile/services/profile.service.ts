import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../models/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _isVisibleToggleMenu: boolean;

  constructor(private http: HttpClient) {
    this.isVisibleToggleMenu = true;
  }


  // public sendUserData(user: User){
  //   return this.http.get("/api/courseworkWeb/user")
  // }
  public saveUserData(user: User){
    return this.http.post("/api/courseworkWeb/user/add", user);
  }
  get isVisibleToggleMenu(): boolean {
    return this._isVisibleToggleMenu;
  }

  set isVisibleToggleMenu(value: boolean) {
    this._isVisibleToggleMenu = value;
  }


  public uploadImage(fileToUpload: File, endpoint:string, id?:number): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    if (id) {
      return this.http.post<User>(`/api/courseworkWeb/products/${id}/image`, formData);
    }
    return this.http.post<User>(`/api/courseworkWeb/products/image`, formData);
  }


}
