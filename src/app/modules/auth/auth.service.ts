import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _popUpSelectionMenu: ElementRef;
  private _loginContent: ElementRef;

  constructor() {
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
