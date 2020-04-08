import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import { Middlewares } from "./middlewares";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    Routes(this.app);
    Middlewares(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
