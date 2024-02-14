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

   @Column({
    nullable: true,
  })

  capacity: number;
  
   @Column({
    nullable: true,
  })

  price: number;

   @Column({
    nullable: true,
  })

  imageURL: string;

   @Column({
    nullable: true,
  })

  longitude: string;

   @Column({
    nullable: true,
  })

  latitude: string;

   @Column({
    nullable: true,
  })

  status: string;

   @Column({
    nullable: true,
  })

  isFree: boolean;

   @Column({
    nullable: true,
  })

  isInDoor: boolean;

   @Column({
    nullable: true,
  })

  isLighting: boolean;

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
