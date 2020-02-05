import { Column, Model, Table, Default } from 'sequelize-typescript';

@Table({ tableName: 'albums' })
export class Album extends Model<Album> {
  @Column
  public name: string;

  @Column
  public spotifyId: string;

  @Column
  public imageUrl: string;

  @Column
  public releaseDate: Date;

  @Column
  public spotifyUrl: string;

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
