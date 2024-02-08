import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
    UpdateDateColumn,
    OneToMany, JoinTable,
    ManyToMany,
} from "typeorm"

import { Team } from "./Team"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    age: number

    @Column({
        nullable: true,
    })
    hobbies: string

    @Column({
        nullable: true,
    })
    image: string

    @Column({
        nullable: true,
    })
    region: string

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

    @ManyToMany(() => Team, (team) => team.users)
    @JoinTable()
    teams: Team[];
}
