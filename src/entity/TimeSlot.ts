import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  OneToOne,
  OneToMany
} from "typeorm";
import { Team } from "./Team";
import { Stadium } from "./Stadium";

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string; 

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Team, (team) => team.timeSlots)
  @JoinTable()
  team: Team;

  @ManyToOne(() => Stadium, (stadium) => stadium.timeSlots)
  @JoinTable()
  stadium: Stadium;
}
