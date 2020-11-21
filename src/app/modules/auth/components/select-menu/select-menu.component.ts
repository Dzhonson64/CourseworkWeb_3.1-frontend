import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.scss']
})
export class SelectMenuComponent implements OnInit, AfterViewInit {
  @ViewChild("popUp") popUp: ElementRef;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.authService.popUpSelectionMenu = this.popUp;
  }


  close() {
    this.authService.togglePopUpSelectionMenu();
  }
}
