import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Song } from '@types';

@Component({
  selector: 'app-previous-tracks',
  templateUrl: './previous-tracks.component.html',
  styleUrls: ['./previous-tracks.component.scss'],
})
export class PreviousTracksComponent implements OnInit, OnChanges {
  @Input() previousTracks: Song[];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {}

  getPreviousTracks() {
    // console.log();

    return this.previousTracks.slice(0, 10);
  }
}
