import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;
  @Column({
    type: 'int',
    nullable: false,
  })
  age: number;
  @Column({
    type: 'int',
    nullable: false,
  })
  balance: number;
  @Column({
    type: 'boolean',
    default: false,
  })
  is_email_verifed: boolean;
}
