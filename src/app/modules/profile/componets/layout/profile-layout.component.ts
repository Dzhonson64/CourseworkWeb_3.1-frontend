import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {


  constructor(private profileService: ProfileService) {
    profileService.isVisibleToggleMenu = false;
  }

  ngOnInit(): void {
    console.log("rt")
  }



}
