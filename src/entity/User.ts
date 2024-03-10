import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { GameHistory } from "./GameHistory";
import { TimeSlot } from "./TimeSlot";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column()
  age: number;

  @Column({
    nullable: true,
  })
  hobbies: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  region: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    default: false,
  })
  is_verified: boolean;

  @Column({
    nullable: true,
  })
  code_verification: number;

  @ManyToMany(() => TimeSlot, (timeSlot) => timeSlot.team)
  @JoinTable()
  timeSlots: TimeSlot[];

 // User entity
@ManyToMany(type => GameHistory, gameHistory => gameHistory.team, { cascade: ['insert', 'update'] })
@JoinTable()
gameHistories: GameHistory[];


}
