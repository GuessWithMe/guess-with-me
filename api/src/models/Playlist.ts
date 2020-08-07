import { BelongsTo, BelongsToMany, Column, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { RoomModel, RoomPlaylistModel, UserModel } from 'models';

@Table({ tableName: 'playlists' })
export class PlaylistModel extends Model<PlaylistModel> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsToMany(() => RoomModel, () => RoomPlaylistModel)
  public rooms: RoomModel[];

  @BelongsTo(() => UserModel, 'userId')
  public user: UserModel;

  @Column
  public spotifyId: string;

  @Column
  public lastImportAt: Date;

  @Column
  public totalSongsAtLastImport: number;

  @Column
  public eligibleSongsAtLastImport: number;

  @Column
  public title: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
