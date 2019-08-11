import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from '@services';

interface GameRoom {
  title: string;
  value: string;
  color?: string;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.pug',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {
  filterValue = '';

  gameRooms: GameRoom[] = [
    {
      title: 'GuessWith.me selection',
      value: 'general'
    }
  ];
  filteredGameRooms = this.gameRooms;

  playerRooms = [];
  filteredPlayerRooms = this.playerRooms;

  constructor(private roomService: RoomService) {
    this.gameRooms = this.gameRooms.map(room => {
      room.color = this.getRandomColor();
      return room;
    });
  }

  async ngOnInit() {
    try {
      const res = await this.roomService.all();
      this.playerRooms = res.rooms.map(room => {
        room.color = this.getRandomColor();
        return room;
      });
      this.filteredPlayerRooms = this.playerRooms;
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {}

  onFilterChange(filterValue: string) {
    if (!filterValue) {
      this.filteredPlayerRooms = this.playerRooms;
      this.filteredGameRooms = this.gameRooms;
    } else {
      this.filteredPlayerRooms = this.playerRooms.filter(
        room => room.title && room.title.toLowerCase().includes(filterValue.toLowerCase())
      );
      this.filteredGameRooms = this.gameRooms.filter(
        room => room.title && room.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
  }

  getRandomColor = () => {
    const colors = ['355C7D', '6C5B78', 'C06C84', 'F67280', 'F8B195'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
}
