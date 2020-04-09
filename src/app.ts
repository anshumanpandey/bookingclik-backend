import * as express from "express";
import * as bodyParser from "body-parser";
import { sequelize, logger } from "./utils";
import { Routes } from "./routes";
import { Middlewares } from "./middlewares";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    Middlewares(this.app);
    Routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private bootstrap() {
    return Promise.all([
      sequelize.authenticate()
    ]);
  }

  start(){
    const PORT = process.env.PORT || 3030;

    this.bootstrap()
    .then(() => this.app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`)))
    .catch(err => {
      logger.error('Could not start app!');
      logger.error(err);
      process.exit(0);
    });
  }
}

export default App;
