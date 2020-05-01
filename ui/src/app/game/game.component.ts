import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { differenceInSeconds, parseISO } from 'date-fns';
import { FormGroup, FormControl } from '@angular/forms';
import { Howl } from 'howler';
import { isDevMode } from '@angular/core';
import FuzzySet from 'fuzzyset.js';

import { Guess, User, Word, Song, PlayerOmitted, RoomStatusResponse, Room } from '@types';
import { UserService, RoomService } from '@services';
import RoomSocket from '../sockets/room';

type Guesses = Record<
  SocketIOClient.Socket['id'],
  {
    titleCorrect: boolean;
    artistCorrect: boolean;
  }
>;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  public players: PlayerOmitted[] = [];
  public currentGuess = '';
  public flashGreenBool = false;
  public flashRedBool = false;
  public guess: Guess;
  public sound: Howl;
  public timeLeft: number;
  public user: User;
  public previousTracks: Song[];
  public isPause = false;
  public room: Room;
  private roomSocket: RoomSocket;
  public guesses: Guesses;

  public guessAttemptForm = new FormGroup({
    currentGuess: new FormControl(''),
  });

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  async ngOnInit() {
    const slug = this.route.snapshot.params.slug;
    this.room = await this.roomService.get(slug);
    this.roomService.roomSource.next(this.room);

    this.userService.user.subscribe(user => {
      this.user = user;
    });

    this.roomSocket = new RoomSocket();
    this.roomSocket.join(slug);
    this.roomSocket.namespace.on('players', (players: PlayerOmitted[]) => {
      this.players = players;
    });
    this.roomSocket.namespace.on('guesses', (guesses: Guesses) => {
      this.guesses = guesses;
    });
    this.roomSocket.namespace.on('song', (status: { song: Song; startTime: Date }) => {
      console.warn('ON song');
      this.processIncomingSong(
        status.song,
        30 - differenceInSeconds(new Date(), new Date(status.startTime)),
      );

      console.log(this.sound);
    });

    this.roomSocket.namespace.on('status', (status: RoomStatusResponse) => {
      console.warn('ON status');

      this.previousTracks = status.prevSongs;
      this.players = Object.values(status.players);

      this.processIncomingSong(
        status.song,
        30 - differenceInSeconds(new Date(), new Date(status.startTime)),
      );
    });

    this.roomSocket.namespace.on('disconnect', () => {
      console.log('disconnect');
    });

    this.roomSocket.namespace.on('pause', (previousTracks: Song[]) => {
      console.warn('ON pause');
      this.previousTracks = previousTracks;
      this.setPause();
      this.timeLeft = 0;
    });

    this.roomSocket.namespace.on('prevSongs', (previousTracks: Song[]) => {
      this.previousTracks = previousTracks;
      // this.setPause();
      // this.timeLeft = 0;
    });

    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 1;
      }
    }, 1000);
  }

  ngOnDestroy() {
    console.log('onNgDestroy');

    if (this.sound) {
      this.sound.stop();
    }

    this.roomSocket.leave(this.route.snapshot.params.slug);

    // Perhaps this is still needed for stopping the sound
    // this.socket.off('song');
    // this.socket.off('status');
  }

  private prepareGuessArray(song: Song) {
    this.guess = {
      artist: [],
      title: [],
      artistCorrect: false,
      titleCorrect: false,
    };

    const artistStripped = this.removeParentheses(song.artists[0].name);
    for (const word of artistStripped.split(' ')) {
      const cleanWord = this.cleanUpWord(word);
      const guessWord: Word = {
        word: cleanWord,
        correct: false,
      };

      this.guess.artist.push(guessWord);
    }

    const titleStripped = this.removeParentheses(song.name);
    for (const word of titleStripped.split(' ')) {
      const cleanWord = this.cleanUpWord(word);
      const guessWord: Word = {
        word: cleanWord,
      };
    }

    if (isDevMode()) {
      console.warn(this.guess.title.map(({ word }) => word).join(' '));
      console.warn(this.guess.artist.map(({ word }) => word).join(' '));
    }
  }

  public processIncomingSong(song: Song, timeLeft: number): void {
    if (this.sound) {
      this.sound.stop();
    }

    if (!song) {
      return;
    }

    this.isPause = false;

    this.prepareGuessArray(song);

    this.sound = new Howl({
      src: [song.previewUrl],
      html5: true,
      onloaderror: arg1 => {
        console.log('HOWLER onloaderror', arg1);
      },
      onload: () => {
        console.log('HOWLER onload');
      },
      onplayerror: arg1 => {
        console.log('HOWLER onplayerror', arg1);
      },
      onplay: () => {
        console.log('HOWLER onplay');
      },
      onend: () => {
        console.log('HOWLER onend');
      },
      onmute: () => {
        console.log('HOWLER onmute');
      },
    });

    this.timeLeft = timeLeft;
    this.sound.play();
    this.sound.seek(30 - timeLeft);
  }

  public matchGuessInput() {
    const input = this.guessAttemptForm.value.currentGuess;
    if (!input || this.isPause) {
      return;
    }

    const inputWords = input.split(' ');
    let somethingWasCorrect = false;

    for (const inputWord of inputWords) {
      this.guess.artist.map(guessWord => {
        // No need to check if word already guessed
        if (!guessWord.correct) {
          const fuzzyset = FuzzySet();
          fuzzyset.add(guessWord.word.toLowerCase());
          const match = fuzzyset.get(inputWord.toLowerCase());

          if (match && match[0][0] > 0.74) {
            somethingWasCorrect = true;
            guessWord.correct = true;
          }
        }

        return guessWord;
      });

      this.guess.title.map(guessWord => {
        // No need to check if word already guessed
        if (!guessWord.correct) {
          const fuzzyset = FuzzySet();
          fuzzyset.add(guessWord.word.toLowerCase());
          const match = fuzzyset.get(inputWord.toLowerCase());

          if (match && match[0][0] > 0.64) {
            somethingWasCorrect = true;
            guessWord.correct = true;
          }
        }

        return guessWord;
      });

      this.guessAttemptForm.reset();

      if (somethingWasCorrect) {
        this.flashGreen();
      } else {
        this.flashRed();
      }
    }

    this.checkIfTitleOrArtistDone();
  }

  public flashGreen() {
    this.flashGreenBool = true;
    this.flashRedBool = false;

    setTimeout(() => {
      this.flashGreenBool = false;
    }, 600);
  }

  public flashRed() {
    this.flashRedBool = true;
    this.flashGreenBool = false;

    setTimeout(() => {
      this.flashRedBool = false;
    }, 600);
  }

  public timesUp() {}

  public cleanUpWord(word: string) {
    // Turn accented chars into normal chars.
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Removing special chars and leaving only numbers, letters
    word = word.replace(/[^A-Za-z0-9\s]/g, '');

    return word;
  }

  public removeParentheses(setOfWords: string): string {
    return setOfWords.replace(/ *\([^)]*\) */g, '');
  }

  private checkIfTitleOrArtistDone() {
    let titleIsDone = true;
    for (const name of this.guess.title) {
      if (!name.correct) {
        titleIsDone = false;
        break;
      }
    }

    let artistIsDone = true;
    for (const name of this.guess.artist) {
      if (!name.correct) {
        artistIsDone = false;
        break;
      }
    }

    let needsProgressUpdate = false;
    if (this.guess.artistCorrect !== artistIsDone) {
      this.guess.artistCorrect = artistIsDone;
      needsProgressUpdate = true;
    }

    if (this.guess.titleCorrect !== titleIsDone) {
      this.guess.titleCorrect = titleIsDone;
      needsProgressUpdate = true;
    }

    if (this.guess.artistCorrect && this.guess.titleCorrect) {
      const successSound = new Howl({
        src: ['assets/sounds/success.wav'],
      });

      successSound.play();
    }

    if (needsProgressUpdate) {
      this.sendProgressUpdateToOtherPlayers();
    }
  }

  private sendProgressUpdateToOtherPlayers() {
    this.roomSocket.namespace.emit('progressUpdate', {
      room: this.room.slug,
      userId: this.user.id,
      spotifyUsername: this.user.spotifyUsername,
      titleCorrect: this.guess.titleCorrect,
      artistCorrect: this.guess.artistCorrect,
    });
  }

  private setPause() {
    this.isPause = true;

    if (this.sound) {
      this.sound.stop();
    }
  }
}
