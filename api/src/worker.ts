import kue, { Job, Queue } from 'kue';
import WebSocket from 'ws';

import { ImportHelper } from 'helpers';
// import { PlaylistSocketService } from 'socketServices';
import { SpotifyService } from 'services';
import { User } from '@types';
import Environment from 'config/environment';

export let worker: BackgroundWorker;

class BackgroundWorker {
  private queue: Queue;

  constructor() {
    this.queue = kue.createQueue({
      redis: {
        host: Environment.redis.host,
        port: Environment.redis.port,
      },
    });

    this.queue.process('importPlaylist', async (job: Job, done: (error?: Error) => void) => {
      console.log('started playlist import job');

      try {
        let songsProcessed = 0;

        const playlist = await new SpotifyService().getPlaylist(job.data.user, job.data.playlistId);
        const eligibleTracks = playlist.tracks.items.filter((s) => !s.is_local);
        const dbPlaylist = await ImportHelper.createOrUpdatePlaylist(job.data.user, playlist, eligibleTracks.length);

        for (const s of eligibleTracks) {
          const songArtists = [];
          for (const spotifyArtist of s.track.artists) {
            job.log(JSON.stringify(spotifyArtist));
            const artist = await ImportHelper.importArtist(spotifyArtist);
            songArtists.push(artist);
          }

          const song = await ImportHelper.importSong(s.track);
          await song.$set('artists', songArtists);

          const album = await ImportHelper.importAlbum(
            s.track.album as SpotifyApi.AlbumObjectSimplified & {
              // TODO: update this once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/41309 is merged
              release_date_precision: string;
              release_date: string;
            }
          );
          await song.$set('album', album);

          await song.$add('playlist', dbPlaylist);

          songsProcessed += 1;
          const progress = songsProcessed / eligibleTracks.length;
          // TODO: Send playlist import progress
        }

        done();
      } catch (error) {
        done(error);
      }
    });
  }

  public importPlaylist(user: User, playlistId: string, ws: WebSocket) {
    const job = this.queue.create('importPlaylist', { user, playlistId, ws }).save();

    job
      .on('complete', (result) => {
        console.log('Job completed with data ', result);
      })
      .on('failed attempt', (errorMessage, doneAttempts) => {
        console.log('Job failed', errorMessage);
      })
      .on('failed', (errorMessage) => {
        console.log('Job failed');
      })
      .on('progress', (progress, data) => {
        console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
      });
  }
}

export function startWorker() {
  worker = new BackgroundWorker();
}
