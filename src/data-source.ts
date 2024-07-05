import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Field } from "./entity/Field"
import { Stadium } from "./entity/Stadium"
import { TimeSlot } from "./entity/TimeSlot"
import { GameHistory } from "./entity/GameHistory"
import { ImageStadium } from "./entity/ImageStadium"
import { Feedback } from "./entity/Feedback"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "jesuiskiller",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User,Field,Stadium,TimeSlot,GameHistory,ImageStadium,Feedback],
    migrations: [],
    subscribers: [],
})
