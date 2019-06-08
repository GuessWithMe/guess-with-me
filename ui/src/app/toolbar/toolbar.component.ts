import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '@services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.pug',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {}


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

