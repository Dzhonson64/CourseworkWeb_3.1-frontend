import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {TablePropertyProductService} from '../../../../../services/table-property-product.service';

@Component({
  selector: 'app-property-product',
  templateUrl: './property-product.component.html',
  styleUrls: ['./property-product.component.scss']
})
export class PropertyProductComponent implements OnInit {
  value = '';
  id: number;
  name_property: string;
  unit_property: string;
  constructor() {
  }

  ngOnInit(): void {
  }

}
