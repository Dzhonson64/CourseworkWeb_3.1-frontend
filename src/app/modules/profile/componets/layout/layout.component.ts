import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  constructor(private profileService: ProfileService) {
    profileService.isVisibleToggleMenu = false;
  }

  ngOnInit(): void {
    console.log("rt")
  }



}
