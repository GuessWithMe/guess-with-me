import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Howl } from 'howler';
import { isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import FuzzySet from 'fuzzyset.js';

import { RoomStatus, Guess, User, Word, Song } from '@types';
import { GameService, SocketService, UserService } from '@services';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  private timeToGuess = 30;
  public activePlayers = [];
  public currentGuess = '';
  public flashGreenBool = false;
  public flashRedBool = false;
  public guess: Guess;
  public socket: SocketIOClient.Socket;
  public sound: Howl;
  public timeLeft = this.timeToGuess;
  public user: User;
  public previousTracks: Song[];
  public isPause = false;

  public guessAttemptForm = new FormGroup({
    currentGuess: new FormControl(''),
  });

  constructor(
    private gameService: GameService,
    private userService: UserService,
    private socketService: SocketService,
    private snackBar: MatSnackBar,
  ) {}

  async ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;
    });

    this.socket = this.socketService.getSocket();
    this.socketService.joinRoom('general');

    this.socket.on('players', (players: User[]) => {
      this.activePlayers = players;
    });

    this.socket.on('song', (song: Song) => {
      this.processIncomingSong(song);
    });

    this.socket.on(
      'status',
      (payload: { status: RoomStatus; previousTracks: Song[]; activePlayers: User[] }) => {
        this.previousTracks = payload.previousTracks;

        if (payload.status.isPaused) {
          this.timeLeft = 0;
          this.setPause();
        }

        this.processIncomingSong(payload.status.currentSong, payload.status.timeLeft);
      },
    );

    this.socket.on('pause', (previousTracks: Song[]) => {
      this.previousTracks = previousTracks;
      this.gameService.setCurrentSong(null);
      this.setPause();
      this.timeLeft = 0;
    });

    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 1;
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.sound) {
      this.sound.stop();
    }

    this.socketService.leaveRoom('general');
    this.socket.off('song');
    this.socket.off('status');
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
        correct: false,
      };
      this.guess.title.push(guessWord);
    }

    if (isDevMode()) {
      console.warn(this.guess.title.map(({ word }) => word).join(' '));
      console.warn(this.guess.artist.map(({ word }) => word).join(' '));
    }
  }

  public processIncomingSong(song: Song, timeLeft = this.timeToGuess): void {
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
    });

    this.timeLeft = timeLeft;

    this.sound.play();
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

  public cleanUpWord(word): string {
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
    this.socket.emit('guessProgressUpdate', {
      userId: this.user.id,
      spotifyUsername: this.user.spotifyUsername,
      titleCorrect: this.guess.titleCorrect,
      artistCorrect: this.guess.artistCorrect,
    });
  }

  /**
   * Sets a game on pause until a new song comes in.
   */
  private setPause() {
    this.isPause = true;

    if (this.sound) {
      this.sound.stop();
    }
  }
}
