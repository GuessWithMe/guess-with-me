import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService, UserService } from '@services';
import { User } from '@types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.pug',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  public user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public async logOut() {
    try {
      await this.authService.logOut();
      this.router.navigate(['/']);
      this.snackBar.open('Come back soon! :)', null, {
        duration: 5000
      });
    } catch (httpError) {
      console.log(httpError);
    }
  }
}
