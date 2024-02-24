import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Field } from "./entity/Field"
import { Stadium } from "./entity/Stadium"
import { TimeSlot } from "./entity/TimeSlot"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "jesuiskiller",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User,Field,Stadium,TimeSlot],
    migrations: [],
    subscribers: [],
})
