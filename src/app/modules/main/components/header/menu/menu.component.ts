import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public drawer: any

  public selectedValue: string = "Все категории";

  constructor() { }

  ngOnInit(): void {
  }

}
