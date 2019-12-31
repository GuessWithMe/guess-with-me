import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '@types';
import { UserService, AuthService } from '@services';

@Component({
  selector: 'app-game-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class GameSidenavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  public socket: SocketIOClient.Socket;

  private userSubscription: Subscription;
  public user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {}

  close(reason: string) {
    this.sidenav.close();
  }

  toggleNav() {
    this.sidenav.toggle();
  }

  public async logOut() {
    try {
      await this.authService.logOut();
      this.router.navigate(['/']);
      this.snackBar.open('Come back soon! :)', null, {
        duration: 5000,
      });
    } catch (httpError) {
      console.log(httpError);
    }
  }

  async ngOnInit() {
    try {
      const user = await this.userService.getUser();
      this.userService.setUser(user);
    } catch (error) {
      console.log(error);
    }

    this.userSubscription = this.userService.user.subscribe(user => {
      this.user = user;
    });

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.close('nav');
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
