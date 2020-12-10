import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-comp-new-product',
  templateUrl: './comp-new-product.component.html',
  styleUrls: ['./comp-new-product.component.scss']
})
export class CompNewProductComponent implements OnInit {
  name: string;
  unit: string;
  value: any;
  id: number;

  constructor() {
  }

  ngOnInit(): void {

  }

}
