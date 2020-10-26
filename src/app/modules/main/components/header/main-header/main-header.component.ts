import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
declare var $: any;
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})


export class MainHeaderComponent implements OnInit {
  @ViewChild(MenuComponent, {static: false})
  public menuComponent: MenuComponent;
  constructor() { }

  ngOnInit(): void {
    setTimeout(function (){ $(".header").addClass("visible");},300);

    $(window).scroll(function(){
      if ($(window).scrollTop() > 1) {
        $('.header').addClass('fixed');
      }
      else {
        $('.header').removeClass('fixed');
      }
      });
  }

}
