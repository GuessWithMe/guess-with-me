import { BelongsTo, Column, ForeignKey, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { Playlist, Room } from 'models';

@Table({ tableName: 'roomPlaylists' })
export class RoomPlaylist extends Model<RoomPlaylist> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsTo(() => Room, 'roomId')
  public room: Room;

  @BelongsTo(() => Playlist, 'playlistId')
  public playlist: Playlist;

  @ForeignKey(() => Room)
  @Column
  public roomId: string;

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
