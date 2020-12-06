import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-product',
  templateUrl: './property-product.component.html',
  styleUrls: ['./property-product.component.scss']
})
export class PropertyProductComponent implements OnInit {
  value = '';
  constructor() { }

  ngOnInit(): void {
  }

}
