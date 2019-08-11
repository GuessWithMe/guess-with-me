import { AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { Playlist, RoomPlaylist } from '@models';

@Table({ tableName: 'rooms' })
export class Room extends Model<Room> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @BelongsToMany(() => Playlist, () => RoomPlaylist)
  public playlists: Playlist[];

  @Column
  public title: string;

  @Column
  public password: string;
}
