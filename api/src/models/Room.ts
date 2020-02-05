import { AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table, Default } from 'sequelize-typescript';

import { Playlist, RoomPlaylist } from 'models';

@Table({ tableName: 'rooms' })
export class Room extends Model<Room> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @BelongsToMany(
    () => Playlist,
    () => RoomPlaylist
  )
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
