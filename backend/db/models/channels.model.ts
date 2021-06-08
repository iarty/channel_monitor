import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Provider } from './provider.model';
import { Server } from './servers.model';

@Table
export class Channel extends Model {
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

  @Column({
    allowNull: false,
  })
  url: string;

  @Column({ defaultValue: false })
  status: boolean;

  @Column({ defaultValue: true })
  isSoundOn: boolean;

  @Column({ defaultValue: false })
  monitoring: boolean;

  @Column({ type: DataType.STRING })
  lastDate: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

  @BelongsTo(() => Provider)
  provider: Provider;

  @ForeignKey(() => Provider)
  @Column
  providerId: number;

  @BelongsTo(() => Server)
  server: Server;

  @ForeignKey(() => Server)
  @Column
  serverId: number;
}
