import { BelongsTo, BelongsToMany, Column, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { Album, Artist, Playlist, SongArtist, SongPlaylist } from 'models';

@Table({ tableName: 'songs' })
export class Song extends Model<Song> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsToMany(() => Artist, () => SongArtist)
  public artists: Artist[];

  @BelongsTo(() => Album, 'albumId')
  public album: Album;

  @BelongsToMany(() => Playlist, () => SongPlaylist)
  public playlists: Playlist[];

  @Column
  public name: string;

  @Column
  public popularity: string;

  @Column
  public previewUrl: string;

  @Column
  public spotifyId: string;

  @Column
  public spotifyUrl: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
