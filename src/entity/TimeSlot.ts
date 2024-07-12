import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  OneToOne,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { User } from "./User";
import { Stadium } from "./Stadium";
import { GameHistory } from "./GameHistory";
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

  @Column({ nullable: true })
  qrCodeUrl: string; // Add this line
  
  @ManyToMany(() => User, (user) => user.timeSlots, { cascade: ["remove"] })
  @JoinTable()
  team: User[];

  @ManyToOne(() => Stadium, (stadium) => stadium.timeSlots)
  @JoinTable()
  stadium: Stadium;
}
