import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environment';
import { UserService } from '@services';

import featureList from './features.json';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {
  public apiUrl = environment.apiUrl;
  public features = featureList;

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit() {
    const user = await this.userService.getUser();

    if (user) {
      this.router.navigate(['/game']);
    }
  }
}
