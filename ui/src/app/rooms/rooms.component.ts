import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.pug',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {
  filterValue = '';

  rooms = [
    {
      title: 'Mixed',
      subtitle: 'Includes all songs in the library',
      value: 'general'
    }
  ];

  constructor() {}

  async ngOnInit() {}

  ngOnDestroy() {}

  onFilterChange(event) {
    console.log(event);
  }
}
