import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.pug',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private adminService: AdminService,
  ) {}

  ngOnInit() { }


  public truncateDatabase() {
    try {
      this.adminService.truncateDatabase();
    } catch (error) {
      console.log(error);
    }
  }
}

