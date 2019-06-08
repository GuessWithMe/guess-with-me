import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Howl } from 'howler';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import FuzzySet from 'fuzzyset.js';

import { UserService, GameService, SocketService } from '@services';
import { User, Guess, Word, Song } from '@t';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.pug',
  styleUrls: ['./game.component.scss']
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
  public previousSong: Song;
  public isPause = false;
  public isAutoplayDisabled = false;
  private songSubscription: Subscription;

  public guessAttemptForm = new FormGroup({
    currentGuess: new FormControl('')
  });

  constructor(
    private userService: UserService,
    private gameService: GameService,
    private socketService: SocketService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.initiateSockets();

    // this.user = await this.userService.getUser();

    // // Getting the current song upon starting the game.
    // const res = await this.gameService.getStatus();
    // this.activePlayers = res['activePlayers'];

    // this.processIncomingSong(res['status']['currentSong'], res['status']['timeLeft']);
    // this.previousSong = res['status']['previousSong'];

    // this.songSubscription = this.gameService.song.subscribe(song => {
    //   if (song) {
    //     this.processIncomingSong(song);
    //   }
    // });

    // setInterval(() => {
    //   if (this.timeLeft > 0) {
    //     this.timeLeft = this.timeLeft - 1;
    //   }
    // }, 1000);

    // this.processAutoplayRestrictions();
  }

  ngOnDestroy() {
    this.gameService.setCurrentSong(null);
    this.songSubscription.unsubscribe();

    if (this.socket) {
      this.gameService.removeUserFromPlayerList(this.socket);
    }

    if (this.sound) {
      this.sound.stop();
    }
  }

  /**
   * Initiates webosockets for controlling the game flow, incoming songs,
   * connecting/disconnecting players etc.
   * @private
   * @returns void
   * @memberof GameComponent
   */
  private initiateSockets(): void {
    this.socket = this.socketService.getSocket();

    this.gameService.addUserToPlayerList(this.socket);

    this.socket.on('song', (song: any) => {
      this.gameService.setCurrentSong(song);
    });

    this.socket.on('pause', (previousSong: Song) => {
      this.previousSong = previousSong;
      this.gameService.setCurrentSong(null);
      this.setPause();
      this.timeLeft = 0;
    });

    this.socket.on('activePlayers', activePlayers => {
      this.activePlayers = activePlayers;
    });
  }

  private prepareGuessArray(songData: object) {
    this.guess = {
      artist: [],
      title: [],
      artistCorrect: false,
      titleCorrect: false
    };

    const artistStripped = this.removeParentheses(songData['artists'][0]['name']);
    for (const word of artistStripped.split(' ')) {
      const cleanWord = this.cleanUpWord(word);
      const guessWord: Word = {
        word: cleanWord,
        correct: false
      };

      this.guess.artist.push(guessWord);
    }

    const titleStripped = this.removeParentheses(songData['name']);
    for (const word of titleStripped.split(' ')) {
      const cleanWord = this.cleanUpWord(word);
      const guessWord: Word = {
        word: cleanWord,
        correct: false
      };
      this.guess.title.push(guessWord);
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
      html5: true
    });

    this.timeLeft = timeLeft;

    this.sound.play();
  }

  public matchGuessInput() {
    const input = this.guessAttemptForm.value.currentGuess;
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

    if (needsProgressUpdate) {
      this.sendProgressUpdateToOtherPlayers();
    }
  }

  private sendProgressUpdateToOtherPlayers() {
    try {
      this.socket.emit('guessProgressUpdate', {
        userId: this.user.id,
        spotifyUsername: this.user.spotifyUsername,
        titleCorrect: this.guess.titleCorrect,
        artistCorrect: this.guess.artistCorrect
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Sets a game on pause until a new song comes in.
   *
   * @private
   * @memberof GameComponent
   */
  private setPause() {
    this.isPause = true;

    if (this.sound) {
      this.sound.stop();
    }
  }

  public processAutoplayRestrictions() {
    if (this.sound && !this.sound.playing()) {
      this.isAutoplayDisabled = true;
      const snackBarRef = this.snackBar.open(`If there's no sound, hit the play button!`, 'Play', {
        duration: 20000
      });
      snackBarRef.onAction().subscribe(() => {
        this.sound.seek(15000);
        this.sound.play();
      });
    }
  }
}
