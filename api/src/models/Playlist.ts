import { BelongsTo, BelongsToMany, Column, Model, Table } from 'sequelize-typescript';

import { Room, RoomPlaylist, User } from '@models';

@Table({ tableName: 'playlists' })
export class Playlist extends Model<Playlist> {
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
}
