import { AutoIncrement, Column, Model, PrimaryKey, Table, Default, BelongsTo, DataType } from 'sequelize-typescript';

import { Room } from 'models';

@Table({ tableName: 'rooms' })
export class RoomPlayer extends Model<RoomPlayer> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @BelongsTo(() => Room, 'roomId')
  public room: Room;

  @Column({ type: DataType.JSONB, allowNull: true })
  public guess!: {
    songCorrect: boolean;
    titleCorrect: boolean;
  };

  @Default(new Date())
  @Column
  public createdAt: Date;

  @Default(new Date())
  @Column
  public updatedAt: Date;
}
