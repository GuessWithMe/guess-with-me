import { AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table, Default } from 'sequelize-typescript';

import { Song, SongArtist } from 'models';

@Table({ tableName: 'artists' })
export class Artist extends Model<Artist> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @BelongsToMany(
    () => Song,
    () => SongArtist
  )
  public songs: Song[];

  @Column
  public name: string;

  @Column
  public spotifyId: string;

  @Column
  public spotifyUrl: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
