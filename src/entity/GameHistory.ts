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
    ManyToMany
  } from "typeorm";
  import { User } from "./User";
  import { Stadium } from "./Stadium";
  @Entity()
  export class GameHistory {
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
  
    @ManyToMany(() => User, (user) => user.gameHistories)
    @JoinTable()
    team : User[];
  
    @ManyToOne(() => Stadium, (stadium) => stadium.gameHistories)
    @JoinTable()
    stadium: Stadium;
  
    
  }
  