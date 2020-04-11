import { join } from 'path';
import * as express from "express";
import * as bodyParser from "body-parser";
import { sequelize, logger, AppError } from "./utils";
import { Routes } from "./routes";
import { Middlewares } from "./middlewares";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    Middlewares(this.app);
    this.app.use(express.static(join(__dirname, '../','expedia-clone-frontend' , 'build')));
    this.app.get('*', (req, res) => {
      res.sendFile(join(__dirname, '../','expedia-clone-frontend' , 'build', 'index.html'));
    });
    Routes(this.app);
    this.app.use((err, req, res, next) => {
      if (err instanceof AppError) {
        res.status(err.response.status).send(err.response);
      } else {
        req.log.error(err);
        if (err.name === 'UnauthorizedError') {
          res.status(401).send({ status: 401, message: 'Invalid token' });
        } else {
          res.status(500).send({ status: 500, message: 'UNKNOW ERROR!' });
        }
      }
    });
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
