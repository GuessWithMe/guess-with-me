import { Column, Model, Table, Default, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table({ tableName: 'albums' })
export class Album extends Model<Album> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

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
