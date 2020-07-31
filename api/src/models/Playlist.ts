import { BelongsTo, BelongsToMany, Column, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { Room, RoomPlaylist, User } from 'models';

@Table({ tableName: 'playlists' })
export class Playlist extends Model<Playlist> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsToMany(() => Room, () => RoomPlaylist)
  public rooms: Room[];

  @BelongsTo(() => User, 'userId')
  public user: User;

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
