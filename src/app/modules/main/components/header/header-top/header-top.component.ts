import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserType} from '../../../../../models/type/UserType';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {

  changesRef : ChangeDetectorRef;
  constructor(private cdRef: ChangeDetectorRef) {
    this.changesRef = cdRef;
  }

  ngOnInit(): void {

  }


}
