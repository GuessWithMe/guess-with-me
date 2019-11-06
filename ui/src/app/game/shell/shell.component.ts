import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { UserService } from '@services';
import { Subscription } from 'rxjs';
import { User } from '@types';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-game-shell',
  templateUrl: './shell.component.pug',
  styleUrls: ['./shell.component.scss']
})
export class GameShellComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  public socket: SocketIOClient.Socket;

  private userSubscription: Subscription;
  public user: User;

  constructor(private userService: UserService, private router: Router) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.close('nav');
      }
    });
  }

  close(reason: string) {
    this.sidenav.close();
  }

  toggleNav() {
    this.sidenav.toggle();
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
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
