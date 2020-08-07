import { Table, Model, Column, BelongsTo, ForeignKey, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { ArtistModel, SongModel } from 'models';

@Table({ tableName: 'songArtists' })
export class SongArtist extends Model<SongArtist> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsTo(() => SongModel, 'songId')
  public song: SongModel;

  @BelongsTo(() => ArtistModel, 'artistId')
  public artist: ArtistModel;

  @ForeignKey(() => SongModel)
  @Column
  public songId: string;

  @ForeignKey(() => ArtistModel)
  @Column
  public artistId: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
