import { BelongsTo, Column, ForeignKey, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { PlaylistModel, SongModel } from 'models';

@Table({ tableName: 'songPlaylists' })
export class SongPlaylist extends Model<SongPlaylist> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsTo(() => SongModel, 'songId')
  public song: SongModel;

  @BelongsTo(() => PlaylistModel, 'playlistId')
  public playlist: PlaylistModel;

  @ForeignKey(() => SongModel)
  @Column
  public songId: string;

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
