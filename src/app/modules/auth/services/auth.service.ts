import {ElementRef, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../../models/User';
import {AddressCompany} from '../../../models/address/AddressCompany';
import {AddressUser} from '../../../models/address/AddressUser';
import {Observable} from 'rxjs';
import {ProviderDto} from '../../../models/ProviderDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _popUpSelectionMenu: ElementRef;
  private _loginContent: ElementRef;

  constructor(private http: HttpClient) {
  }

  public togglePopUpSelectionMenu() {
    if (this.popUpSelectionMenu.nativeElement.classList.contains('open')) {
      setTimeout(() =>  this.loginContent.nativeElement.classList.remove('blur-it'), 200);
      this.popUpSelectionMenu.nativeElement.classList.remove('open');
    }else{
      this.loginContent.nativeElement.classList.add('blur-it');
      this.popUpSelectionMenu.nativeElement.classList.add('open');
    }
  }


  public saveUser(user: User):Observable<User>{
    return this.http.post<User>("/api/courseworkWeb/auth/register/user", user);
  }

  public saveCompany(providerDto: ProviderDto):Observable<User>{
    return this.http.post<User>("/api/courseworkWeb/auth/register/provider", providerDto);
  }

  public loginProvider(providerDto: ProviderDto):Observable<ProviderDto>{
    return this.http.post<ProviderDto>("/api/courseworkWeb/auth/login/provider", providerDto);
  }

  public loginUser(user: ProviderDto){
    return this.http.post("/api/courseworkWeb/auth/login", user);
  }

  get popUpSelectionMenu(): ElementRef {
    return this._popUpSelectionMenu;
  }

  set popUpSelectionMenu(value: ElementRef) {
    this._popUpSelectionMenu = value;
  }

  get loginContent(): ElementRef {
    return this._loginContent;
  }

  set loginContent(value: ElementRef) {
    this._loginContent = value;
  }
}
