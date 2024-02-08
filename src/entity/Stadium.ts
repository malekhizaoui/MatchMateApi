import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinTable
} from "typeorm";

import { TimeSlot } from "./TimeSlot";
import { Field } from "./Field";


@Entity()
export class Stadium {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stadiumName: string;

  @Column()
  capacity: number;

  @Column()
  imageURL: string;

  @Column()
  longitude: string;

  @Column()
  latitude: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.team)
  timeSlots: TimeSlot[];

  @ManyToOne(() => Field, (field) => field.stadiums)
  @JoinTable()
  field: Field;
}
