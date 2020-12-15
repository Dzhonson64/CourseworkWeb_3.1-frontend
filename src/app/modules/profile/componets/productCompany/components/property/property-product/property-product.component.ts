import {Component, OnInit} from '@angular/core';
import {TablePropertyProductService} from '../../../../../services/table-property-product.service';
import {StatusActive} from '../../../../../../../models/type/StatusActive';

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
  status: StatusActive
  statusActive = StatusActive;
  constructor( private propertyProductService: TablePropertyProductService) {
    this.status = StatusActive.ENABLE;
  }

  ngOnInit(): void {
  }

  delete() {
    this.status = StatusActive.UNABLE;
    if (this.id) {
      this.propertyProductService.deleteProperty(this.id).subscribe(value1 => {

      })
    }

  }
}
