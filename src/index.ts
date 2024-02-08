import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from 'express';

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.json());

    const port = process.env.PORT || 3009;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    
    });

}).catch(error => console.log(error))
