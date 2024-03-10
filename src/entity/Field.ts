import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  
import { Stadium } from "./Stadium";
  @Entity()
  export class Field {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    fieldName: string;
  
    @Column()
    imageURL: string;
    
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Stadium, (stadium) => stadium.field)
	  stadiums: Stadium[];
  }
  