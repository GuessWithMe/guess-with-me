import { BelongsToMany, Column, Model, Table, Default, DataType } from 'sequelize-typescript';

import { PlaylistModel, RoomPlaylistModel } from 'models';
import { UUIDV4 } from 'sequelize';

@Table({ tableName: 'rooms' })
export class RoomModel extends Model<RoomModel> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsToMany(() => PlaylistModel, () => RoomPlaylistModel)
  public playlists: PlaylistModel[];

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
