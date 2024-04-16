import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Image } from './image.model';
import { UserImages } from './userImages.model';

@Table
export class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Unique(true)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column
  @CreatedAt
  createdAt: Date;

  @Column
  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => Image, () => UserImages)
  images: Image[];
}
