import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService, UserService, RoomService } from '@services';
import { User, Room } from '@types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() toggleNav: EventEmitter<any> = new EventEmitter();

  private userSubscription: Subscription;
  private roomSubscription: Subscription;
  public user: User;
  public room: Room;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private roomService: RoomService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.user.subscribe(user => {
      this.user = user;
    });

    this.roomSubscription = this.roomService.room.subscribe(room => {
      this.room = room;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.roomSubscription.unsubscribe();
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
}
