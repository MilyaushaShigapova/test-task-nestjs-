import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Tag } from '../tag/tag.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({
    description: 'ID Пользователя',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @ApiProperty({
    description: 'email адрес пользователя(уникальный)',
    example: 'user@gmail.com',
  })
  @Column({
    unique: true,
    length: 100,
  })
  email: string;

  @ApiProperty({
    description:
      'Пароль пользователя.Должен содержать цифру, заглавную и строчную буквы',
    example: 'Password123',
  })
  @Column({
    length: 100,
  })
  password: string;

  @ApiProperty({
    description: 'Nickname пользователя(уникальный)',
    example: 'NickName',
  })
  @Column({ unique: true, length: 30 })
  nickname: string;

  @ApiProperty({ description: 'Дата создания пользователя' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Дата изменения пользователя' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Тэги пользователя',
  })
  @ManyToMany(() => Tag, (tags) => tags.users, {})
  @JoinTable()
  tags: Tag[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
  @OneToMany(() => Tag, (tag: Tag) => tag.creator)
  public tag: Tag[];

  @Column({ nullable: true })
  refresh_token?: string;

  @Column({ nullable: true })
  refresh_token_expires: string;
}
