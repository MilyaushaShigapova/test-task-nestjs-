import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { UserTagCreatorI } from '../user/dto/user.interface';
@Entity({ name: 'tags' })
export class Tag extends BaseEntity {
  @ApiProperty({
    description: 'Тэг ID ',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Наименования Тэга',
    example: 'TagName',
  })
  @Column({
    length: 40,
  })
  name: string;

  @ApiProperty({
    description: 'Поле сортировки',
    example: 0,
  })
  @Column({ default: 0, type: 'integer' })
  sortOrder: number;

  @ManyToOne(() => User, (user: User) => user.tag, {
    cascade: ['insert', 'update', 'remove'],
  })
  public creator: UserTagCreatorI;

  @ManyToMany(() => User, (users) => users.tags, {
    cascade: ['insert', 'update', 'remove'],
  })
  users: User;
}
