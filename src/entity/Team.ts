import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { TimeSlot } from "./TimeSlot";
import { User } from "./User";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamName: string;

  @Column({
    default: 0,
})
  teamSize: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.teams)
	@JoinTable()
	users: User[];

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.team)
  timeSlots: TimeSlot[];

}
