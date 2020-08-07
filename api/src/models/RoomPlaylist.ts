import { BelongsTo, Column, ForeignKey, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { PlaylistModel, RoomModel } from 'models';

@Table({ tableName: 'roomPlaylists' })
export class RoomPlaylistModel extends Model<RoomPlaylistModel> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsTo(() => RoomModel, 'roomId')
  public room: RoomModel;

  @BelongsTo(() => PlaylistModel, 'playlistId')
  public playlist: PlaylistModel;

  @ForeignKey(() => RoomModel)
  @Column
  public roomId: string;

  @ForeignKey(() => PlaylistModel)
  @Column
  public playlistId: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
