import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.scss']
})
export class FirstScreenComponent implements OnInit {

 
  ngOnInit(): void {

    this.jAnimationShow();
    this.jScrollToForm();
  }


  jAnimationShow(): void {
    setTimeout(function () { $("h1").addClass("visible"); }, 700);
    setTimeout(function () { $(".new_btn").addClass("visible"); }, 1000);

  }
  jScrollToForm(): void {
    $("a.new_btn").click(function () {
      var elementClick = $(this).attr("href");
      var destination = $(elementClick).offset().top;
      $('html,body').animate({ scrollTop: destination }, 1100);
      return false;
    });
  }

}
