import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Field } from "./entity/Field"
import { Stadium } from "./entity/Stadium"
import { Team } from "./entity/Team"
import { TimeSlot } from "./entity/TimeSlot"

export const AppDataSource = new DataSource({
    type: "postgres",
    host:  process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: "postgres",
    password: "jesuiskiller",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User,Field,Stadium,Team,TimeSlot],
    migrations: [],
    subscribers: [],
})
