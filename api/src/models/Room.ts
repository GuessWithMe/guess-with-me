import { BelongsToMany, Column, Model, Table, Default, DataType } from 'sequelize-typescript';

import { Playlist, RoomPlaylist } from 'models';
import { UUIDV4 } from 'sequelize';

@Table({ tableName: 'rooms' })
export class Room extends Model<Room> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsToMany(() => Playlist, () => RoomPlaylist)
  public playlists: Playlist[];

  @Column
  public title: string;

  @Column
  public slug: string;

  @Default(false)
  @Column
  public isPersistent: boolean;

  @Column
  public password: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
