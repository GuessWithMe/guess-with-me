import { BelongsTo, Column, ForeignKey, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { Playlist, Song } from 'models';

@Table({ tableName: 'songPlaylists' })
export class SongPlaylist extends Model<SongPlaylist> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsTo(() => Song, 'songId')
  public song: Song;

  @BelongsTo(() => Playlist, 'playlistId')
  public playlist: Playlist;

  @ForeignKey(() => Song)
  @Column
  public songId: string;

  @ForeignKey(() => Playlist)
  @Column
  public playlistId: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
