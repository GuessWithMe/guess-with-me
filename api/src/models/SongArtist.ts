import { Table, Model, Column, BelongsTo, ForeignKey, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { Artist, Song } from 'models';

@Table({ tableName: 'songArtists' })
export class SongArtist extends Model<SongArtist> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

  @BelongsTo(() => Song, 'songId')
  public song: Song;

  @BelongsTo(() => Artist, 'artistId')
  public artist: Artist;

  @ForeignKey(() => Song)
  @Column
  public songId: string;

  @ForeignKey(() => Artist)
  @Column
  public artistId: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
