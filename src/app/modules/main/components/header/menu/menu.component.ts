import {Component, ElementRef, OnInit} from '@angular/core';
import {ProfileService} from '../../../../profile/services/profile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public drawer: any;
  private _isVisibleToggleMenu: boolean;

  public selectedValue: string = 'Все категории';



  constructor(private profileService: ProfileService) {
    this.isVisibleToggleMenu = profileService.isVisibleToggleMenu;
  }

  ngOnInit(): void {
  }


  get isVisibleToggleMenu(): boolean {
    return this._isVisibleToggleMenu;
  }

  set isVisibleToggleMenu(value: boolean) {
    this._isVisibleToggleMenu = value;
  }
}
