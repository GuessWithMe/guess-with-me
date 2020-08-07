import { Column, HasMany, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { PlaylistModel } from 'models';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @Column
  public spotifyUsername: string;

  @Column
  public spotifyId: string;

  @Column
  public spotifyAccessToken: string;

  @Column
  public spotifyRefreshToken: string;

  @Column
  public spotifyDisplayName: string;

  @Column(DataType.TEXT)
  public spotifyImageUrl: string;

  @Column
  public tokenExpiresAt: Date;

  @HasMany(() => PlaylistModel, 'userId')
  public playlists: PlaylistModel[];

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
