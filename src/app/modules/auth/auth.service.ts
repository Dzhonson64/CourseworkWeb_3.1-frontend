import {ElementRef, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

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

  public searchCity(str: string) {
    const params = new HttpParams()
      .set('query', str.toString())
      .set('contentType', "city")
      .set('withParent', "1")
      .set('limit', "5");
    return this.http.get("https://kladr-api.ru/api.php", {params});
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
