import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { User } from "./User";
  import { Stadium } from "./Stadium";
  
  @Entity()
  export class Feedback {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    stars: number;
  
    @Column({
      nullable: true,
    })
    comment: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne(() => User, (user) => user.feedbacks)
    user: User;
  
    @ManyToOne(() => Stadium, (stadium) => stadium.feedbacks)
    stadium: Stadium;
  }
  