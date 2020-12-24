import {Component, ElementRef, OnInit} from '@angular/core';
import {ProfileService} from '../../../../profile/services/profile.service';
import {CatalogTreeService} from '../../../../profile/services/catalog-tree.service';
import {UserType} from '../../../../../models/type/UserType';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public drawer: any;
  private _isVisibleToggleMenu: boolean;
  username: string;
  userId: string;
  type: string;
  amountPurchase : number = 0;
  typeUser = UserType;
  public selectedValue: string = 'Все категории';



  constructor(private profileService: ProfileService,
              ) {
    this.isVisibleToggleMenu = profileService.isVisibleToggleMenu;
  }

  ngOnInit(): void {
    this.username = localStorage.getItem("name")
    this.type = localStorage.getItem("type")
    this.userId = localStorage.getItem("userId")
    this.amountPurchase = Number(localStorage.getItem("amountPurchase"))
  }

  logout() {
    localStorage.removeItem("type")
    localStorage.removeItem("name")
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    this.ngOnInit()
  }
  get isVisibleToggleMenu(): boolean {
    return this._isVisibleToggleMenu;
  }

  set isVisibleToggleMenu(value: boolean) {
    this._isVisibleToggleMenu = value;
  }
}
