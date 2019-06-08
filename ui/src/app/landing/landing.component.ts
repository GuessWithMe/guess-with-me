import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.pug',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {
  public apiUrl = environment.apiUrl;

  public features = [
    {
      heading: 'Compete with others',
      description:
        "Compete with your family, friends or complete strangers from all around the world. Show 'em who knows the most hidden gems of your favorite genres.",
      iconClass: 'fa-users'
    },
    {
      heading: 'Add songs',
      description: 'Effortlesly add new songs by importing your Spotify playlists with a click of a button.',
      iconClass: 'fa-music'
    },
    {
      heading: 'Rooms',
      description:
        "Play with the rest of community or create private rooms for uninterrupted personal one-on-one's or team challenges in a group setting.",
      iconClass: 'fa-door-open'
    },
    {
      heading: 'Discover',
      description: 'Discover new songs and save them directly to your library or one of your Spotify playlists.',
      iconClass: 'fa-grin-hearts'
    },
    {
      heading: 'Find your pace',
      description:
        'Is your typing speed keeping you back? It better not. Cause it matters. Compete for the fastest guess and stay on the leaderboard till someone knocks you off.',
      iconClass: 'fa-stopwatch'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
