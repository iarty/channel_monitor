import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  DeletedAt,
  HasMany,
  UpdatedAt,
} from 'sequelize-typescript';

import { Channel } from './channels.model';

@Table
export class Server extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: false,
  })
  name: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

  @HasMany(() => Channel)
  channel: Channel[];
}
