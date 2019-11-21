import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { UserService } from '@services';
import { Subscription } from 'rxjs';
import { User } from '@types';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-game-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class GameShellComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  public socket: SocketIOClient.Socket;

  private userSubscription: Subscription;
  public user: User;

  constructor(private userService: UserService, private router: Router) {}

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

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.close('nav');
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
