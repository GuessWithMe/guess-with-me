import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table, Default } from 'sequelize-typescript';

import { Playlist, Room, Song } from 'models';

@Table({ tableName: 'roomPlaylists' })
export class RoomPlaylist extends Model<RoomPlaylist> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @BelongsTo(() => Room, 'roomId')
  public room: Room;

  @BelongsTo(() => Playlist, 'playlistId')
  public playlist: Playlist;

  @ForeignKey(() => Room)
  @Column
  public roomId: number;

  @ForeignKey(() => Playlist)
  @Column
  public playlistId: number;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
