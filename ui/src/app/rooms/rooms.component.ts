import { Component, OnInit, OnDestroy } from '@angular/core';

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

  filteredRooms = this.rooms;

  constructor() {}

  async ngOnInit() {}

  ngOnDestroy() {}

  onFilterChange(filterValue: string) {
    if (!event) {
      this.filteredRooms = this.rooms;
    } else {
      this.filteredRooms = this.rooms.filter(room => room.title.includes(filterValue));
    }
  }
}
