import * as express from "express";
import * as Controllers from "../controllers";
import { validate, set } from 'express-route-validator'
import { AsyncHandler } from "../middlewares/AsyncMiddleware";

set('errorHandler', function (err, req, res, next) {
  res.status(401).send({ status: 401, message: err.toString()});
});

export function Routes(app: express.Router) {
  const TestController: Controllers.TestController = new Controllers.TestController();
  const AuthController: Controllers.AuthController = new Controllers.AuthController();
  const SearchController: Controllers.SearchController = new Controllers.SearchController();

  app.route("/test")
      .get(AsyncHandler(TestController.index));

    app.route("/search")
      .get(validate({
        query: {
          location: { isRequired: true },
          puDate: { isRequired: true },
          doDate: { isRequired: true },
        },
      }), AsyncHandler(SearchController.index));

  app.route("/login")
    .get(AsyncHandler(AuthController.index));

  app.route("/iataCodes")
    .get(AsyncHandler(SearchController.iataCodes));

  app.route("/categories/:offering")
    .get(AsyncHandler(SearchController.filters));
}
