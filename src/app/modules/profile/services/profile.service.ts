import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../models/User';
import {Observable} from 'rxjs';
// @ts-ignore
import {UserAndProviderDto} from '../../../models/UserAndProviderDto';
import {OrderProductDto} from '../../../models/OrderProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _isVisibleToggleMenu: boolean;
  amountPurchase: number;

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

  public getUsersAndProviders(): Observable<UserAndProviderDto> {

    return this.http.get<UserAndProviderDto>(`/api/courseworkWeb/auth/users`);
  }

  public deleteUsersAndProviders(id: number):Observable<UserAndProviderDto>{
    return this.http.delete<UserAndProviderDto>(`/api/courseworkWeb/auth/users/${id}`);
  }

  public getAllOrderProduct(userId: number):Observable<OrderProductDto[]>{
    return this.http.get<OrderProductDto[]>(`/api/courseworkWeb/order/all/${userId}`);
  }

  public getUser(userId: number):Observable<User>{
    return this.http.get<User>(`/api/courseworkWeb/user/${userId}`);
  }

  public updateUser(user: User):Observable<User>{
    return this.http.post<User>(`/api/courseworkWeb/user`, user);
  }


}
