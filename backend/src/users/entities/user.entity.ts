import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  family: string;
  @Column({ type: Date })
  birthday: Date;
  @Column({ nullable: true })
  name: string;
}
