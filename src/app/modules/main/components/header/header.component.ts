import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
