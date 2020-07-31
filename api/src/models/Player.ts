import { Column, Model, Table, Default, BelongsTo, DataType } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

import { Room } from 'models';

@Table({ tableName: 'rooms' })
export class RoomPlayer extends Model<RoomPlayer> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  public id: string;

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
